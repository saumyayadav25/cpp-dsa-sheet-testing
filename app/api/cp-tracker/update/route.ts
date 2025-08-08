// Fetch from platforms + Save to DB

//Fetches all platforms at a time 
import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { CpStats } from "@/models/CpStats";
import { fetchLeetCodeStats } from "@/lib/cp/fetchLeetCode";
import { fetchCodeforcesStats } from "@/lib/cp/fetchCodeforces";
import { fetchHackerEarthStats } from "@/lib/cp/fetchHackerEarth";
//import { fetchGFGStats } from "@/lib/cp/fetchGFG";
//import { fetchHackerRankStats } from "@/lib/cp/fetchHackerRank";
//import { fetchCodeChefStats } from "../../../../lib/cp/fetchCodeChef";
//import more platforms later...

await connect(); // connect to MongoDB


export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const {
      userId, // You need to pass this from frontend
      leetcodeUsername,
      codeforcesHandle,
      gfgUsername,
      hackerrankUsername,
      codechefUsername,
      hackerearthUsername,
      // more platforms...
    } = body;
    
    const stats: any = {};

    if (leetcodeUsername) {
      try {
        stats.leetcode = await fetchLeetCodeStats(leetcodeUsername);
      } catch (e) {
        console.error("❌ Error fetching LeetCode stats:", e);
      }
    }

    if (codeforcesHandle) {
      try {
        stats.codeforces = await fetchCodeforcesStats(codeforcesHandle);
      } catch (e) {
        console.error("❌ Error fetching Codeforces stats:", e);
      }
    }

    
    if (hackerearthUsername) {
        try {
            stats.hackerearth = await fetchHackerEarthStats(body.hackerearthUsername);
        } catch (e) {
            console.error("❌ Error fetching HackerEarth stats:", e);
        }
     }

    //  MongoDB persistence (add/update user's CP stats)
    if (userId) {
      await CpStats.findOneAndUpdate(
        { userId },
        {
          userId,
          stats,
          leetcodeUsername,
          codeforcesHandle,
          gfgUsername,
          hackerrankUsername,
          codechefUsername,
          hackerearthUsername,
        },
        { upsert: true, new: true }
      );
    } else {
      console.warn("⚠️ No userId provided — skipping DB save.");
    }
  

    


    return NextResponse.json({ success: true, data: stats });
  } catch (err) {
    console.error("CP Tracker Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch CP stats" },
      { status: 500 }
    );
  }
}

