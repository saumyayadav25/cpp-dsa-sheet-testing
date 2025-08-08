import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { CpStats} from "@/models/CpStats";
import { User } from "@/models/User.model";
import { fetchLeetCodeStats } from "@/lib/cp/fetchLeetCode";
import { fetchCodeforcesStats } from "@/lib/cp/fetchCodeforces";
//import { fetchHackerEarthStats } from "@/lib/cp/fetchHackerEarth";
//import { fetchGFGStats } from "@/lib/cp/fetchGFG";
//import { fetchHackerRankStats } from "@/lib/cp/fetchHackerRank";
//import { fetchCodeChefStats } from "../../../../lib/cp/fetchCodeChef";  
//imports for platforms if implemented in future



export async function GET(_req: Request, context: { params: { userId: string } }) {
  try {
    await connect();
    
    const { params } = context; // await context implicitly
    const { userId } = params;

    const cpStats = await CpStats.findOne({ userId });

    if (!cpStats) {
      return NextResponse.json({ success: false, message: "No stats found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: cpStats });
  } catch (error) {
    console.error("❌ Error fetching CP stats:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: { params: { userId: string } }) {
  try {
    await connect();

    const { params } = context; // await context implicitly
    const { userId } = params;
    const body = await request.json();


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        leetcodeUsername: body.leetcodeUsername,
        codeforcesHandle: body.codeforcesHandle,
        // and other handles
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('[userId] POST error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
