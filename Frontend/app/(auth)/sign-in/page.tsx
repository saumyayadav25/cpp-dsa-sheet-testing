"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import OtpInput from "@/components/verify-otp";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/OAuthLogin";

export default function SigninPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("api/sign-in", {
        email: form.email,
        password: form.password,
      });

      if (res.status === 200) {
        setOtpOpen(true);
        toast(res.data.message)
      }
      else toast("❌ Wrong Password. Please try with correct password");

    } catch (error) {
      toast("❌ Wrong Password. Please try with correct password");
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
      setLoading(true);
      try {
        const res = await axios.post("/api/signIn-verify-Otp", {
          email: form.email,
          otp,
        });
  
        if (res.status === 200) {
          toast("✅ Account verified successfully!");
          setOtpOpen(false);
          router.push("/");
        } else {
          toast("❌ OTP verification failed.");
        }
      } catch (err: any) {
        toast("❌ OTP verification failed.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Login to your account
        </h2>
        <p className="text-sm text-gray-500">
          Explore Essentia.ai and summarize your PDFs smarter.
        </p>
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

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <Input
          id="password"
          placeholder="Password"
          type={seePass ? "text" : "password"}
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
        <div className="text-right text-xs text-gray-700 mt-2 h-5">
        <p>
          Forgot Password?{" "}
          <Link
            href={"/resetPassword"}
            className=" text-xs text-blue-600 hover:underline"
          >
            Reset Password
          </Link>
        </p>
      </div>
        <div
          onClick={() => setSeePass(!seePass)}
          className="absolute top-[42px] -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {seePass ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-br from-slate-900 to-blue-600 hover:from-blue-700 hover:to-slate-900"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Sign In"
        )}
      </Button>


      <div className="text-center font-bold text-blue-500">OR</div>

      <div className="text-center">
        <GoogleLoginButton />
      </div>

      <hr className="border-1" />

      <div className="text-center text-sm text-gray-700 mb-2">
        <p>
          Didn't have an account?{" "}
          <Link href={"/sign-up"} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <OtpInput 
        email={form.email}
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
