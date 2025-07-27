"use client";

import { Suspense } from "react";
import ChangePassword from "./changePassword";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePassword />
    </Suspense>
  );
}
