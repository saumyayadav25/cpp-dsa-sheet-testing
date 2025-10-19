// Centralized POTD Streak Manager (client-side only)
// Handles: day-id calculation, increment logic, midnight reset, and broadcasting updates

export const STREAK_KEYS = {
    STREAK: "potd_streak",
    LAST_DONE: "potd_last_done_day", // YYYY-MM-DD in local time
    LAST_CHECKED: "potd_last_checked_day", // for midnight transition dedupe
} as const;

export type StreakState = {
    streak: number;
    lastDoneDay: string | null;
    lastCheckedDay: string | null;
    today: string;
    yesterday: string;
};

export function getLocalDayId(date: Date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function getYesterday(dayId?: string): string {
    const base = dayId
        ? new Date(Number(dayId.slice(0, 4)), Number(dayId.slice(5, 7)) - 1, Number(dayId.slice(8, 10)))
        : new Date();
    const y = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1);
    return getLocalDayId(y);
}

export function readStreakState(): StreakState {
    if (typeof window === "undefined") {
        const today = getLocalDayId();
        return { streak: 0, lastDoneDay: null, lastCheckedDay: null, today, yesterday: getYesterday(today) };
    }
    const today = getLocalDayId();
    const streak = parseInt(localStorage.getItem(STREAK_KEYS.STREAK) || "0", 10) || 0;
    const lastDoneDay = localStorage.getItem(STREAK_KEYS.LAST_DONE);
    const lastCheckedDay = localStorage.getItem(STREAK_KEYS.LAST_CHECKED);
    return { streak, lastDoneDay, lastCheckedDay, today, yesterday: getYesterday(today) };
}

function writeStreakState(partial: Partial<Pick<StreakState, "streak" | "lastDoneDay" | "lastCheckedDay">>) {
    if (typeof window === "undefined") return;
    if (partial.streak !== undefined) {
        localStorage.setItem(STREAK_KEYS.STREAK, String(partial.streak));
    }
    if (partial.lastDoneDay !== undefined) {
        if (partial.lastDoneDay === null) localStorage.removeItem(STREAK_KEYS.LAST_DONE);
        else localStorage.setItem(STREAK_KEYS.LAST_DONE, partial.lastDoneDay);
    }
    if (partial.lastCheckedDay !== undefined) {
        if (partial.lastCheckedDay === null) localStorage.removeItem(STREAK_KEYS.LAST_CHECKED);
        else localStorage.setItem(STREAK_KEYS.LAST_CHECKED, partial.lastCheckedDay);
    }
}

export function dispatchStreakUpdated() {
    if (typeof window === "undefined") return;
    const detail = readStreakState();
    window.dispatchEvent(new CustomEvent("streak:updated", { detail }));
}

// Call when user completes today's POTD
export function markPotdCompletedToday(): StreakState {
    const { streak, lastDoneDay, today } = readStreakState();
    if (lastDoneDay === today) {
        // Already marked today; no change
        const state = readStreakState();
        dispatchStreakUpdated();
        return state;
    }

    const yesterday = getYesterday(today);
    const nextStreak = lastDoneDay === yesterday ? streak + 1 : 1;
    writeStreakState({ streak: nextStreak, lastDoneDay: today, lastCheckedDay: today });
    const state = readStreakState();
    dispatchStreakUpdated();
    return state;
}

// Check at (or after) midnight: if user didn't do yesterday's POTD, reset to 0
export function checkForMidnightReset(): StreakState {
    const state = readStreakState();
    const { today, yesterday, lastDoneDay, lastCheckedDay, streak } = state;

    // Only run once per day in the same tab unless forced by visibility/storage
    if (lastCheckedDay === today) return state;

    let newStreak = streak;
    if (lastDoneDay === today) {
        // Already done today, no reset
        writeStreakState({ lastCheckedDay: today });
    } else if (lastDoneDay === yesterday) {
        // User maintained streak up to yesterday; keep as is until they solve today
        writeStreakState({ lastCheckedDay: today });
    } else {
        // Missed yesterday (or lastDoneDay is null/older) -> streak broken
        newStreak = 0;
        writeStreakState({ streak: 0, lastCheckedDay: today });
    }

    const next = readStreakState();
    // If changed, broadcast
    if (next.streak !== state.streak) dispatchStreakUpdated();
    return next;
}

function msUntilNextLocalMidnight(): number {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return Math.max(0, midnight.getTime() - now.getTime());
}

export function initStreakWatchers(): () => void {
    if (typeof window === "undefined") return () => { };

    // Initial check on mount/first load
    checkForMidnightReset();

    // Schedule a timer to run at next local midnight
    let timeoutId: number | null = window.setTimeout(function tick() {
        checkForMidnightReset();
        // Schedule next midnight
        timeoutId = window.setTimeout(tick, 24 * 60 * 60 * 1000);
    }, msUntilNextLocalMidnight());

    // Re-check when tab becomes visible (covers sleep/clock changes)
    const onVisibility = () => {
        if (document.visibilityState === "visible") {
            checkForMidnightReset();
        }
    };
    window.addEventListener("visibilitychange", onVisibility);

    // Relay localStorage updates across same-tab components as an event
    const onStorage = (e: StorageEvent) => {
        if (!e.key || !Object.values(STREAK_KEYS).includes(e.key as any)) return;
        dispatchStreakUpdated();
    };
    window.addEventListener("storage", onStorage);

    return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        window.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("storage", onStorage);
    };
}

// Reconcile local streak with authoritative server values
// Use when user logs in, loads app, or after server updates progress
export function reconcileWithServer(serverStreak: number, lastVisited?: string | Date | null): StreakState {
    if (typeof window === "undefined") return readStreakState();
    const today = getLocalDayId();
    let lastVisitedDay: string | null = null;
    if (lastVisited) {
        const d = typeof lastVisited === "string" ? new Date(lastVisited) : lastVisited;
        if (!isNaN(d.getTime())) {
            lastVisitedDay = getLocalDayId(d);
        }
    }

    // Set lastDoneDay based on lastVisited local day
    // If lastVisited is today, mark as done today; if yesterday, set yesterday; else keep as older
    let nextLastDone: string | null = null;
    if (lastVisitedDay === today) nextLastDone = today;
    else if (lastVisitedDay === getYesterday(today)) nextLastDone = getYesterday(today);
    else nextLastDone = lastVisitedDay; // could be null or an older day id

    // Write server-provided streak; lastCheckedDay = today to avoid double reset on this load
    writeStreakState({ streak: Math.max(0, Number(serverStreak) || 0), lastDoneDay: nextLastDone, lastCheckedDay: today });
    const state = readStreakState();
    dispatchStreakUpdated();
    return state;
}
