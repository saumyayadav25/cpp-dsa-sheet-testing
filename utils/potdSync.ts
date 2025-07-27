import { Question, sampleTopics } from "@/data/questions";

/**
 * Utility functions for POTD and DSA progress synchronization
 *
 * This implements one-way sync: POTD completion → DSA list marking
 * DSA list completion does NOT affect POTD status (as per requirements)
 */

/**
 * Finds the corresponding DSA question for a given POTD question
 * Uses multiple criteria for accurate matching
 * @param potdQuestion - The POTD question to find in DSA list
 * @returns Object with topic info and question info if found, null otherwise
 */
export function findCorrespondingDSAQuestion(potdQuestion: Question) {
  for (const topic of sampleTopics) {
    const questionMatch = topic.questions.find((q) => {
      // Primary matching criteria
      const titleMatch = q.title === potdQuestion.title;
      const difficultyMatch = q.difficulty === potdQuestion.difficulty;

      // Secondary matching criteria (for better accuracy)
      const linksMatch =
        JSON.stringify(q.links) === JSON.stringify(potdQuestion.links);

      return titleMatch && difficultyMatch && linksMatch;
    });

    if (questionMatch) {
      return {
        topic,
        question: questionMatch,
        uniqueKey: `${topic.id}-${questionMatch.id}`,
      };
    }
  }

  // Fallback: Try with just title and difficulty if links don't match
  for (const topic of sampleTopics) {
    const questionMatch = topic.questions.find(
      (q) =>
        q.title === potdQuestion.title &&
        q.difficulty === potdQuestion.difficulty
    );

    if (questionMatch) {
      console.warn(
        `POTD Sync: Found match with different links for "${potdQuestion.title}"`
      );
      return {
        topic,
        question: questionMatch,
        uniqueKey: `${topic.id}-${questionMatch.id}`,
      };
    }
  }

  return null;
}

/**
 * Syncs POTD completion to DSA progress (one-way sync)
 * This function ensures that when POTD is marked as done,
 * the corresponding DSA question is also marked as solved
 * @param potdQuestion - The POTD question that was completed
 * @returns boolean indicating if sync was successful
 */
export function syncPOTDToDSAProgress(potdQuestion: Question): boolean {
  try {
    const match = findCorrespondingDSAQuestion(potdQuestion);

    if (!match) {
      console.warn(
        "POTD Sync: Could not find corresponding DSA question for:",
        {
          title: potdQuestion.title,
          difficulty: potdQuestion.difficulty,
        }
      );
      return false;
    }

    // Get current DSA progress
    const storedProgress = localStorage.getItem("dsa-progress");
    const progress = storedProgress ? JSON.parse(storedProgress) : {};

    // Check if already solved to avoid unnecessary updates
    if (progress[match.uniqueKey]?.isSolved) {
      console.log(
        `POTD Sync: Question "${potdQuestion.title}" already marked as solved in DSA progress`
      );
      return true;
    }

    // Update the DSA progress to mark this question as solved
    const updatedProgress = {
      ...progress,
      [match.uniqueKey]: {
        ...progress[match.uniqueKey],
        isSolved: true,
        solvedAt: new Date().toISOString(),
        // Preserve other properties like notes and revision status
        isMarkedForRevision:
          progress[match.uniqueKey]?.isMarkedForRevision || false,
        note: progress[match.uniqueKey]?.note || "",
      },
    };

    // Save updated progress back to localStorage
    localStorage.setItem("dsa-progress", JSON.stringify(updatedProgress));

    console.log(
      `POTD Sync: Successfully marked "${potdQuestion.title}" as solved in DSA progress (${match.uniqueKey})`
    );
    return true;
  } catch (error) {
    console.error("POTD Sync: Error occurred during sync:", error);
    return false;
  }
}

/**
 * Gets the current POTD completion status
 * Note: This is independent of DSA list status as per requirements
 * POTD status is determined only by potd_last_done localStorage key
 * @returns boolean indicating if today's POTD is completed
 */
export function getPOTDStatus(): boolean {
  const today = new Date().toDateString();
  const lastDone = localStorage.getItem("potd_last_done");
  return today === lastDone;
}

/**
 * Checks if a DSA question is solved
 * @param topicId - The topic ID
 * @param questionId - The question ID
 * @returns boolean indicating if the question is marked as solved
 */
export function isDSAQuestionSolved(
  topicId: number,
  questionId: number
): boolean {
  const storedProgress = localStorage.getItem("dsa-progress");
  const progress = storedProgress ? JSON.parse(storedProgress) : {};
  const uniqueKey = `${topicId}-${questionId}`;
  return progress[uniqueKey]?.isSolved || false;
}

/**
 * Debug function to log current sync status
 * Useful for development and troubleshooting
 */
export function debugSyncStatus(): void {
  console.log("=== POTD Sync Debug Info ===");
  console.log("POTD Status:", {
    lastDone: localStorage.getItem("potd_last_done"),
    streak: localStorage.getItem("potd_streak"),
    isCompletedToday: getPOTDStatus(),
  });

  const progress = JSON.parse(localStorage.getItem("dsa-progress") || "{}");
  const solvedCount = Object.values(progress).filter(
    (p: any) => p?.isSolved
  ).length;

  console.log("DSA Progress:", {
    totalEntries: Object.keys(progress).length,
    solvedQuestions: solvedCount,
    sampleEntries: Object.entries(progress).slice(0, 3),
  });
  console.log("========================");
}
