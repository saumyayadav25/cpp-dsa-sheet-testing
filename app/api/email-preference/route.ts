import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const action = searchParams.get("action");

    if (!email || !action) {
      return NextResponse.json({ success: false, message: "Missing email or action." }, { status: 400 });
    }

    const updates: Partial<{ subscribedToEmails: boolean; subscribedToNewsletter: boolean }> = {};

    if (action === "unsubscribe") updates.subscribedToEmails = false;
    else if (action === "newsletter") updates.subscribedToNewsletter = true;
    else {
      return NextResponse.json({ success: false, message: "Invalid action." }, { status: 400 });
    }

    const user = await User.findOneAndUpdate({ email }, updates, { new: true });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }
    if (action === "unsubscribe") {
        return NextResponse.json({ success: true, message: "You have been unsubscribed from emails." });
    } else if (action === "newsletter") {
        return NextResponse.json({ success: true, message: "You have been subscribed to the newsletter." });
    }   
    // return NextResponse.json({ success: true, message: `Successfully updated preferences for ${email}.` });
  } catch (err) {
    console.error("Error in /api/email-preference:", err);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
