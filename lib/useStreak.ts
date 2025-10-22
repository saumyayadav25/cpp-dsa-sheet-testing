"use client";

import { useEffect, useState } from "react";
import { StreakState, checkForMidnightReset, initStreakWatchers, readStreakState } from "@/utils/streak";

export function useStreak() {
    const [state, setState] = useState<StreakState>(() => readStreakState());

    useEffect(() => {
        // Initial check + set
        setState(checkForMidnightReset());
        const dispose = initStreakWatchers();

        const onUpdate = (e: Event) => {
            // @ts-ignore CustomEvent typing
            const detail = (e as CustomEvent).detail as StreakState | undefined;
            if (detail) setState(detail);
            else setState(readStreakState());
        };
        window.addEventListener("streak:updated", onUpdate as EventListener);

        return () => {
            window.removeEventListener("streak:updated", onUpdate as EventListener);
            dispose && dispose();
        };
    }, []);

    return state;
}
