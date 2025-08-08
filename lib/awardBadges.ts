import { Badge } from "@/models/Badge.model";

export async function awardBadges(userId: string, progress: any) {
  const badgesToAdd: string[] = [];
  
  // Consistency Badge
  if (progress.streakCount >= 7 && !progress.badges.includes("Consistency_7"))
    badgesToAdd.push("Consistency_7");
  if (progress.streakCount >= 14 && !progress.badges.includes("Consistency_14"))
    badgesToAdd.push("Consistency_14");
  if (progress.streakCount >= 30 && !progress.badges.includes("Consistency_30"))
    badgesToAdd.push("Consistency_30");

  // Hard Hitter
  if (progress.hardSolved >= 10 && !progress.badges.includes("Hard_Hitter"))
    badgesToAdd.push("Hard_Hitter");

  // 50 Questions Done
  if (progress.totalSolved >= 50 && !progress.badges.includes("50_Questions_Done"))
    badgesToAdd.push("50_Questions_Done");

  // Daily Devotee
  if (progress.streakCount >= 10 && !progress.badges.includes("Daily_Devotee"))
    badgesToAdd.push("Daily_Devotee");

  if (badgesToAdd.length > 0) {
    await Badge.findOneAndUpdate(
      { userId },
      { $addToSet: { badges: { $each: badgesToAdd } } },
      { upsert: true, new: true }
    );
  }
}
