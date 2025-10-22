"use client";

import { useEffect } from "react";
import { initStreakWatchers } from "@/utils/streak";

export default function StreakProvider() {
    useEffect(() => {
        const dispose = initStreakWatchers();
        return () => dispose && dispose();
    }, []);
    return null;
}
