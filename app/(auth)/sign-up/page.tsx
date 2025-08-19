"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Loader2, Eye, EyeOff } from "lucide-react";
import OtpInput from "@/components/verify-otp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/OAuthLogin";
import { ToastContainer, toast, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import banner from "@/assets/banner.png";
export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [isPassCorrect, setIsPassCorrect] = useState(false);
  const [isConfirmPassCorrect, setConfirmIsPassCorrect] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password: string) => {
    const str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const hasUpper = password.split("").some((ch) => ch >= "A" && ch <= "Z");
    const hasLower = password.split("").some((ch) => ch >= "a" && ch <= "z");
    const hasDigit = password.split("").some((ch) => ch >= "0" && ch <= "9");
    const hasSpecial = password.split("").some((ch) => !str.includes(ch));
    return (
      hasUpper && hasLower && hasDigit && hasSpecial && password.length >= 8
    );
  };

  const handleSubmit = async () => {
    const { fullName, email, password, confirmPassword } = form;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required.", {
        progressClassName: "bg-red-500",
      });
      return;
    }

    if (!validatePassword(password)) {
      setIsPassCorrect(true);
      return;
    } else {
      setIsPassCorrect(false);
    }

    if (password !== confirmPassword) {
      setConfirmIsPassCorrect(true);
      return;
    } else {
      setConfirmIsPassCorrect(false);
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/sign-up", {
        fullName,
        email,
        password,
      });

      if (res.status === 200) {
        setOtpOpen(true);
        toast.success("OTP sent successfully!", {
          progressClassName: "bg-green-500",
        });
      } else {
        toast.error(res.data?.message || "Signup failed. Please try again", {
          progressClassName: "bg-red-500",
        });
      }
    } catch (err: any) {
      toast.error("Signup failed. Please try again", {
          progressClassName: "bg-red-500",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/verify-otp", {
        email: form.email,
        otp,
      }); 

      if (res.status === 200) {      
        toast.success("Account verified successfully!", {
          progressClassName: "bg-green-500",
        });
        setOtpOpen(false);
        //  Navigate to dashboard or home directly
        router.push("/");
      } else {
        toast.error("OTP verification failed.", {
          progressClassName: "bg-red-500",
        });
      }
    } catch (err: any) {
      toast.error("OTP verification failed.", {
          progressClassName: "bg-red-500",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-blue-100  px-6 py-2 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        transition={Slide}
        toastClassName="relative flex p-4 items-center rounded-xl bg-white text-black shadow-md"
        //bodyClassName="text-sm font-medium"
        progressClassName="absolute bottom-0 left-0 h-1 rounded-b-xl bg-green-500"
      />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="text-sm text-gray-500">
          Join DSAMate and boost your DSA Skills.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            placeholder="e.g. John Doe"
            name="fullName"
            onChange={handleChange}
            value={form.fullName}
            required
          />
        </div>

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
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            required
          />
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
          {isPassCorrect && (
            <div className="mt-1 text-xs text-blue-600 space-y-0.5">
              <p>
                <b>*</b> Password must be at least 8 characters
              </p>
              <p>
                <b>*</b> Include uppercase, lowercase, number, and symbol
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={form.confirmPassword}
            required
          />
          {isConfirmPassCorrect && (
            <div className="mt-1 text-xs text-blue-600">
              <p>
                <b>*</b> Passwords do not match
              </p>
            </div>
          )}
        </div>

        <Button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full mt-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  {loading ? (
    <Loader2 className="animate-spin mr-2 h-4 w-4" />
  ) : (
    "Sign Up" // Or "Sign In"
  )}
</Button>
      </div>

      <div className="text-center font-bold text-blue-500">OR</div>
      
            <div className="text-center">
              <GoogleLoginButton />
            </div>

      <hr className="border-1" />

      <div className="text-center text-sm text-gray-700">
        <p>
          Already have an account?{" "}
          <Link href={"/sign-in"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* OTP Dialog */}
      <OtpInput
        email={form.email}
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
}
