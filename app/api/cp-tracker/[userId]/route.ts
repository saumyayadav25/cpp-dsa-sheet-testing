import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { CpStats } from "@/models/CpStats";
import { User } from "@/models/User.model";
import { fetchLeetCodeStats } from "@/lib/cp/fetchLeetCode";
import { fetchCodeforcesStats } from "@/lib/cp/fetchCodeforces";
import { fetchHackerEarthStats } from "@/lib/cp/fetchHackerEarth";
// future imports for more platforms

// Correct GET signature for Next.js App Router
export async function GET(
  _req: Request,
  context: any  //loosened type 
) {
  try {
    await connect();

    const { userId } = context.params;
    const cpStats = await CpStats.findOne({ userId });

    if (!cpStats) {
      return NextResponse.json(
        { success: false, message: "No stats found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cpStats });
  } catch (error) {
    console.error("❌ Error fetching CP stats:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

//  Correct POST signature for Next.js App Router
export async function POST(
  request: Request,
  context: any
) {
  try {
    await connect();

    const { userId } = context.params;
    const body = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        leetcodeUsername: body.leetcodeUsername,
        codeforcesHandle: body.codeforcesHandle,
        hackerearthUsername: body.hackerearthUsername,
        // and other handles
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("[userId] POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
