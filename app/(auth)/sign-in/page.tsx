"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import OtpInput from "@/components/verify-otp";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/OAuthLogin";
import { ToastContainer, toast, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
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
        toast.success(res.data.message, { //gives response Signin successfull otp sent
          progressClassName: "bg-green-500",
        });
      }
      else {
        toast.error(" Incorrect email or password", {
            progressClassName: "bg-red-500",
          });
        }    

    } catch (error) {
      toast.error(" Please enter valid credentials", {
          progressClassName: "bg-red-500",
      });

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
          toast.success("Login successful", {
            progressClassName: "bg-green-500",
          });

          setOtpOpen(false);
          router.push("/");
        } else {
          toast.error(" OTP verification failed", {
            progressClassName: "bg-red-500",
          });

        }
      } catch (err: any) {
        toast.error(" OTP verification failed", {
            progressClassName: "bg-red-500",
        });
      } finally {
        setLoading(false);
      }
    };

  // Import motion from framer-motion at the top:
  // import { motion } from "framer-motion";

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-blue-100 border-2 p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-16 -left-16 w-56 h-56 bg-blue-300 rounded-full opacity-30 z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500 rounded-full opacity-20 z-0"
        animate={{ scale: [1, 1.1, 1], rotate: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        transition={Slide}
        toastClassName="relative flex p-4 items-center rounded-xl bg-white text-black shadow-md"
        progressClassName="absolute bottom-0 left-0 h-1 rounded-b-xl bg-green-500"
      />
      <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Login to your account
        </h2>
        <p className="text-sm text-gray-500">
          Explore <span className="text-blue-700">DSAMate</span> to enter the world of problem solving.
        </p>
      </div>

      <div className="space-y-4 relative z-10">
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

      <div className="relative z-10">
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
        className="w-full rounded-lg text-white bg-gradient-to-br from-blue-900 to-blue-500 transition-colors duration-300 hover:from-blue-600 hover:to-blue-800 relative z-10"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="text-center font-bold text-blue-500 relative z-10">OR</div>

      <div className="text-center relative z-10">
        <GoogleLoginButton />
      </div>

      <hr className="border-1 relative z-10" />

      <div className="text-center text-sm text-gray-700 mb-2 relative z-10">
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
    </motion.div>
  );
}
