import { Badge } from "@/models/Badge.model";

export async function awardBadges(userId: string, progress: any) {
  const badgesToAdd: string[] = [];

  // --- Topic Completion Badges ---
  if (Array.isArray(progress.topicsCompleted)) {
    progress.topicsCompleted.forEach((topic: string) => {
      if (!progress.badges.some((b: any) => b.name === topic)) {
        badgesToAdd.push(topic);
      }
    });
  }

  // --- Consistency Badges ---
  if (progress.streakCount >= 7 && !progress.badges.some((b: any) => b.name === "Consistency_7"))
    badgesToAdd.push("Consistency_7");
  if (progress.streakCount >= 14 && !progress.badges.some((b: any) => b.name === "Consistency_14"))
    badgesToAdd.push("Consistency_14");
  if (progress.streakCount >= 30 && !progress.badges.some((b: any) => b.name === "Consistency_30"))
    badgesToAdd.push("Consistency_30");

  // --- Hard Hitter ---
  if (progress.hardSolved >= 10 && !progress.badges.some((b: any) => b.name === "Hard_Hitter"))
    badgesToAdd.push("Hard_Hitter");

  // --- 50 Questions Done ---
  if (progress.totalSolved >= 50 && !progress.badges.some((b: any) => b.name === "50_Questions_Done"))
    badgesToAdd.push("50_Questions_Done");

  // --- Daily Devotee ---
  if (progress.streakCount >= 10 && !progress.badges.some((b: any) => b.name === "Daily_Devotee"))
    badgesToAdd.push("Daily_Devotee");

  if (badgesToAdd.length > 0) {
    const badgesToAddObjects = badgesToAdd.map(name => ({
      name,
      claimedAt: new Date(),
    }));

    await Badge.findOneAndUpdate(
      { userId },
      { $push: { badges: { $each: badgesToAddObjects } } },
      { upsert: true, new: true }
    );
  }
}
