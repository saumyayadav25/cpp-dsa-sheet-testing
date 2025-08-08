import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import { sendEmail } from "@/lib/mail";
import { getPOTD } from "@/utils/getPOTD";

export async function GET() {
  try {
    await connect(); // Connect to MongoDB

    const users = await User.find({ subscribedToEmails: true }); // ✅ Define here only
    const problem = getPOTD();

    for (const user of users) {
      if (!user.email) continue;

      const platformLinks = Object.entries(problem.links || {})
        .map(
          ([platform, url]) =>
            `<a href="${url}" target="_blank" style="color: #3b82f6;">${platform}</a>`
        )
        .join(" | ") || "No links available";
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
          <a href="${baseUrl}/email-preference?email=${user.email}&action=unsubscribe">Unsubscribe</a> |

          <a href="${baseUrl}/email-preference?email=${user.email}&action=newsletter">Subscribe to Newsletter</a>
        </small>
      `;

      await sendEmail({
        to: user.email,
        subject: `🧠 DSAMate POTD – ${problem.title}`,
        html,
      });
    }

    return NextResponse.json({ message: "POTD emails sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending POTD emails:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
