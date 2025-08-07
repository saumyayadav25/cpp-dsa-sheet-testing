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

export default function SigninPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
 enhance/login-ui
        toast(res.data.message);
      } else {
        toast("❌ Wrong Password. Please try with correct password");
      }

        toast.success(res.data.message, { //gives response Signin successfull otp sent
          progressClassName: "bg-green-500",
        });
      }
      else {
        toast.error(" Incorrect email or password", {
            progressClassName: "bg-red-500",
          });
        }    

 main
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
 enhance/login-ui
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
 main
      }
    } catch (err: any) {
      toast("❌ OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
 enhance/login-ui
    <div 
      className={`w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6 transition-all duration-500 ${
        isHovered ? 'bg-gradient-to-br from-blue-50 to-indigo-100 shadow-blue-200 shadow-xl' : 'bg-white'
      }`}
      onMouseEnter={() => {
        setIsFormVisible(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsFormVisible(false);
        setIsHovered(false);
      }}
    >
      {/* Header Section with Animation Trigger */}
      <div className="text-center transition-all duration-500">
        <h2 className={`text-3xl font-bold mb-1 transition-all duration-500 transform ${
          isHovered 
            ? 'text-blue-700 scale-105' 
            : 'text-gray-900 scale-100'
        }`}>

    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
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
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
    main
          Login to your account
        </h2>
        <p className={`text-sm transition-all duration-500 ${
          isHovered ? 'text-blue-600' : 'text-gray-500'
        }`}>
          Explore DSAMate to enter the world of problem solving.
        </p>
        <div className={`mt-2 text-xs transition-all duration-500 ${
          isHovered 
            ? 'text-blue-500 opacity-100' 
            : 'text-gray-400 opacity-60'
        }`}>
          {!isFormVisible ? 'Hover to reveal login form' : 'Welcome! Please login to continue'}
        </div>
      </div>

      {/* Animated Form Section */}
      <div className={`transition-all duration-700 ease-in-out transform ${
        isFormVisible 
          ? 'opacity-100 translate-y-0 max-h-[1000px] scale-100' 
          : 'opacity-0 translate-y-8 max-h-0 scale-95 overflow-hidden'
      }`}>
        <div className="space-y-4">
          <div className={`transition-all duration-500 delay-100 transform ${
            isFormVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                isHovered ? 'text-blue-700' : 'text-gray-700'
              }`}
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
              className={`transition-all duration-300 focus:scale-[1.02] ${
                isHovered 
                  ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-200' 
                  : 'focus:ring-gray-200'
              }`}
            />
          </div>
        </div>

        <div className={`relative mt-4 transition-all duration-500 delay-200 transform ${
          isFormVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}>
          <label
            htmlFor="password"
            className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              isHovered ? 'text-blue-700' : 'text-gray-700'
            }`}
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
            className={`transition-all duration-300 focus:scale-[1.02] ${
              isHovered 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-200' 
                : 'focus:ring-gray-200'
            }`}
          />
          <div className="text-right text-xs text-gray-700 mt-2 h-5">
            <p>
              Forgot Password?{" "}
              <Link
                href={"/resetPassword"}
                className={`text-xs hover:underline transition-colors duration-200 ${
                  isHovered ? 'text-blue-600' : 'text-blue-500'
                }`}
              >
                Reset Password
              </Link>
            </p>
          </div>
          <div
            onClick={() => setSeePass(!seePass)}
            className={`absolute top-[42px] -translate-y-1/2 right-3 cursor-pointer transition-all duration-200 hover:scale-110 ${
              isHovered ? 'text-blue-500 hover:text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {seePass ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </div>
        </div>

        <div className={`transition-all duration-500 delay-300 transform ${
          isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isHovered
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                : 'bg-gradient-to-br from-slate-900 to-blue-600 hover:from-blue-700 hover:to-slate-900'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        <div className={`text-center font-bold mt-6 transition-all duration-500 delay-400 ${
          isFormVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'text-blue-600' : 'text-blue-500'}`}>
          OR
        </div>

        <div className={`text-center transition-all duration-500 delay-500 transform ${
          isFormVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}>
          <GoogleLoginButton />
        </div>

        <hr className={`border-1 mt-6 transition-all duration-500 delay-600 ${
          isFormVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'border-blue-300' : 'border-gray-300'}`} />

        <div className={`text-center text-sm mb-2 transition-all duration-500 delay-700 transform ${
          isFormVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        } ${isHovered ? 'text-blue-700' : 'text-gray-700'}`}>
          <p>
            Didn't have an account?{" "}
            <Link 
              href={"/sign-up"} 
              className={`hover:underline transition-colors duration-200 ${
                isHovered ? 'text-blue-600' : 'text-blue-500'
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>
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