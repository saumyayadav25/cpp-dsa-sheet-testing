// Fetch from platforms + Save to DB
import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { CpStats } from "@/models/CpStats";
import { fetchLeetCodeStats } from "@/lib/cp/fetchLeetCode";
import { fetchCodeforcesStats } from "@/lib/cp/fetchCodeforces";
import { fetchHackerEarthStats } from "@/lib/cp/fetchHackerEarth";

export async function POST(req: Request) {
  try {
    await connect();

    const body = await req.json();
    const {
      userId,
      leetcodeUsername,
      codeforcesHandle,
      hackerearthUsername,
    } = body;

    const stats: any = {};

    if (leetcodeUsername) {
      try {
        stats.leetcode = await fetchLeetCodeStats(leetcodeUsername);
      } catch (e) {
        console.error("Error fetching LeetCode stats:", e);
      }
    }

    if (codeforcesHandle) {
      try {
        stats.codeforces = await fetchCodeforcesStats(codeforcesHandle);
      } catch (e) {
        console.error("Error fetching Codeforces stats:", e);
      }
    }

    if (hackerearthUsername) {
      try {
        stats.hackerearth = await fetchHackerEarthStats(hackerearthUsername);
      } catch (e) {
        console.error("Error fetching HackerEarth stats:", e);
      }
    }

    if (userId) {
      await CpStats.findOneAndUpdate(
        { userId },
        {
          userId,
          leetcode: stats.leetcode || {},
          codeforces: stats.codeforces || {},
          hackerearth: stats.hackerearth || {},
        },
        { upsert: true, new: true }
      );
    } else {
      console.warn("No userId provided; skipping DB save.");
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

