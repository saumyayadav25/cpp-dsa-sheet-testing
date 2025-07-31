import { Suspense } from "react";
import EmailPreferenceContent from "./content";

export default function EmailPreferencePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailPreferenceContent />
    </Suspense>
  );
}
