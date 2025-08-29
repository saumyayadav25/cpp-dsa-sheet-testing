import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import { sendEmail } from "@/lib/mail";
import { getPOTD } from "@/utils/getPOTD";
import { JobRun } from "../../../models/JobRun.model";

function getISTDateKey(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA gives YYYY-MM-DD
  return formatter.format(date);
}


export async function GET(request: Request) {
  try {
    const providedSecret = request.headers.get("x-cron-secret") || new URL(request.url).searchParams.get("key");
    const expectedSecret = process.env.CRON_SECRET;
    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connect(); // Connect to MongoDB

    //const users = await User.find({ subscribedToEmails: true }); // Define here only
    // Ensure index exists for idempotency even in production
    await JobRun.collection.createIndex({ jobName: 1, dateKey: 1 }, { unique: true });

    const dateKey = getISTDateKey(new Date());

    // Ensure this job runs only once per day (idempotency)
    try {
      await JobRun.create({ jobName: "send-potd", dateKey });
    } catch (err: any) {
      if (err && err.code === 11000) {
        // Duplicate entry means the job already ran today
        return NextResponse.json({ message: "POTD already sent today" });
      }
      throw err;
    }

    const emails: string[] = await User.distinct("email", { subscribedToEmails: true });

    const problem = getPOTD();

    let successCount = 0;
    let failureCount = 0;
    const failedEmails: string[] = [];

    for (const email of emails) {
      if (!email) continue;

      const platformLinks = Object.entries(problem.links || {})
        .map(
          ([platform, url]) =>
            `<a href="${url}" target="_blank" style="color: #3b82f6;">${platform}</a>`
        )
        .join(" | ") || "No links available";
        // const baseUrl =
        //     process.env.NODE_ENV === "production"
        //         ? "https://dsa-sheet-template.vercel.app"
        //         : "http://localhost:3000";
        const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://dsa-sheet-template.vercel.app"
          : "http://localhost:3000";

      const html = `
        <h2>🧠 DSAMate Problem of the Day</h2>
        <p><strong>${problem.title}</strong></p>
        <p>Difficulty: <strong>${problem.difficulty}</strong></p>
        <p>Links: ${platformLinks}</p>
        ${
          problem.solutionLink
            ? `<p><a href="${problem.solutionLink}" target="_blank">🔗 GitHub Solution</a></p>`
            : ""
        }
        <br/>
        <small>
          <a href="${baseUrl}/email-preference?email=${email}&action=unsubscribe">Unsubscribe</a> |
          <a href="${baseUrl}/email-preference?email=${email}&action=newsletter">Subscribe to Newsletter</a>
      `;

      const emailResult = await sendEmail({
        to: email,
        subject: `🧠 DSAMate POTD – ${problem.title}`,
        html,
      });

      if (emailResult.success) {
        successCount++;
        console.log(`✅ POTD email sent successfully to ${email}:`, emailResult.messageId);
      } else {
        failureCount++;
        failedEmails.push(email);
        console.error(`❌ Failed to send POTD email to ${email}:`, emailResult.error);
      }
    }

    const message = `POTD emails sent successfully! Success: ${successCount}, Failures: ${failureCount}`;
    if (failedEmails.length > 0) {
      console.warn("Failed emails:", failedEmails);
    }

    return NextResponse.json({ 
      message,
      successCount,
      failureCount,
      failedEmails: failedEmails.length > 0 ? failedEmails : undefined
    });
  } catch (error) {
    console.error("❌ Error sending POTD emails:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
