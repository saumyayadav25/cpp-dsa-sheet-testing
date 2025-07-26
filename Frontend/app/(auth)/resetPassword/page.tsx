"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import OtpInput from "@/components/verify-otp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function resetPassword() {
  const [form, setForm] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forgotPassword", {
        email: form.email,
      });

      if (res.status === 200) {
        toast("✅ OTP send to email successfully");
        setOtpOpen(true);
      }

    } catch (error) {
      toast("❌ Failed to send OTP. Please try again");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  const verifyForgotPassOtp = async (otp : string) => {
    setLoading(true);
      try {
        const res = await axios.post("/api/verifyForgotPassOtp", {
          email: form.email,
          otp,
        });
  
        if (res.status === 200) {
          toast("✅ OTP Verified!");
          setOtpOpen(false);
          router.push(`/changePassword?email=${form.email}`);
        } else {
          toast("❌ OTP verification failed.");
        }
      } catch (err: any) {
        toast("❌ OTP verification failed.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Reset your Password
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            placeholder="you@example.com"
            name="email"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>
      </div>
      <Button
        onClick={generateOtp}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-br from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Reset Password"
        )}
      </Button>

      <OtpInput
        email={form.email}
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={verifyForgotPassOtp}
      />
    </div>
  );
}
