"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailPreferencePage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing your request...");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const action = searchParams?.get("action");
    const email = searchParams?.get("email");

    if (!email || !action) {
      setMessage("Missing email or action.");
      setStatus("error");
      return;
    }

    const updatePreferences = async () => {
      try {
        const res = await fetch(`/api/email-preference?action=${action}&email=${email}`);
        const data = await res.json();
          if (res.ok && data.success) {
              if (action === "unsubscribe") {
                  setMessage("You have been unsubscribed.");
              } else if (action === "newsletter") {
                  setMessage("You have been subscribed to the newsletter.");
              } else {
                  setMessage(data.message);
              }
              setStatus("success");
          } else {
          setMessage(data.message || "Something went wrong.");
          setStatus("error");
        }
      } catch (err) {
        setMessage("Failed to update preferences.");
        setStatus("error");
      }
    };

    updatePreferences();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Preferences</h2>
        <p className={`text-${status === "success" ? "green" : status === "error" ? "red" : "gray"}-600`}>
          {message}
        </p>
      </div>
    </div>
  );
}
