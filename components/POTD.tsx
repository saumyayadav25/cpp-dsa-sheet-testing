"use client";

import { useState, useEffect } from "react";
import { Question } from "@/data/questions";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

type POTDProps = {
  potd: Question | null;
  updateStreak: () => void;
};

export default function POTD({ potd, updateStreak }: POTDProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [today, setToday] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 503) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  // ✅ Check if today's POTD is already done
  useEffect(() => {
    const currentDate = new Date().toDateString();
    setToday(currentDate);
    const lastDone = localStorage.getItem("potd_last_done");
    setIsSolved(currentDate === lastDone);
  }, []);

  // ✅ Mark POTD as done and update backend progress
  const handleMarkDone = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await axios.post("/api/progress/update", {
        userId: user._id, // Required by backend
        questionDifficulty: potd?.difficulty || "medium", // Use actual difficulty
        topicCompleted: null, // Pass topic name if applicable
      });

      if (res.status === 200) {
        console.log("Progress updated:", res.data);

        // Mark locally to avoid multiple submissions in same day
        localStorage.setItem("potd_last_done", today);
        setIsSolved(true);

        // Optionally update streak UI if needed
        updateStreak();

        // Play success sound
        const audio = new Audio("/sounds/done.mp3");
        audio.play().catch((err) => {
          console.log("Audio play blocked or failed", err);
        });
      } else {
        console.error("Failed to update progress", res.data);
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  if (!potd) return null;

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 mb-8 flex justify-between items-start shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-3">
            Problem of the Day 🔥
          </h2>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
            {potd.title}
          </p>
          <p className="text-sm mt-2 text-muted-foreground capitalize">
            Difficulty:{" "}
            <span
              className={`font-semibold ${
                potd.difficulty === "easy"
                  ? "text-green-600 dark:text-green-400"
                  : potd.difficulty === "medium"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {potd.difficulty}
            </span>
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {Object.entries(potd.links || {}).map(([platform, url]) => {
              const displayName =
                platform === "leetcode"
                  ? "LeetCode"
                  : platform === "gfg"
                  ? "GeeksForGeeks"
                  : platform === "hackerrank"
                  ? "HackerRank"
                  : platform === "spoj"
                  ? "SPOJ"
                  : platform === "ninja"
                  ? "Coding Ninjas"
                  : platform === "code"
                  ? "Other Platform"
                  : platform === "custom"
                  ? "View Question"
                  : platform;

              const textColor =
                platform === "leetcode"
                  ? "text-blue-600 dark:text-blue-400"
                  : platform === "gfg"
                  ? "text-green-600 dark:text-green-400"
                  : platform === "hackerrank"
                  ? "text-yellow-600 dark:text-yellow-300"
                  : platform === "spoj"
                  ? "text-purple-600 dark:text-purple-400"
                  : platform === "ninja"
                  ? "text-pink-600 dark:text-pink-400"
                  : platform === "code"
                  ? "text-orange-600 dark:text-orange-400"
                  : platform === "custom"
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-muted-foreground";

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:no-underline transition-all duration-200 ${textColor} hover:opacity-80`}
                >
                  {displayName}
                </a>
              );
            })}

            {potd.solutionLink && (
              <a
                href={potd.solutionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline hover:no-underline hover:text-foreground transition-all duration-200"
              >
                GitHub Solution
              </a>
            )}
          </div>
        </div>

        {!isSolved ? (
          <Button
            onClick={handleMarkDone}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md"
          >
            Mark as Done
          </Button>
        ) : (
          <div className="text-green-600 dark:text-green-400 font-medium text-sm bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md border border-green-200 dark:border-green-900/40 flex items-center gap-2">
            <span>✅</span>
            <span>Today's POTD Completed!</span>
          </div>
        )}
      </div>
      {/* Login Required Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">🔒 Login Required</DialogTitle>
            <DialogDescription className="text-center">
              You need to be logged in to mark the Problem of the Day as
              completed and track your progress.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginModal(false);
                router.push("/sign-in");
              }}
              className="w-full sm:w-auto"
            >
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
