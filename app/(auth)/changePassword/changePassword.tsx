"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function changePassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [loading, setLoading] = useState(false);
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
    if (!form.password || !form.confirmPassword) {
      toast("All fields are required.");
      return;
    }

    if (!validatePassword(form.password)) {
      setIsPassCorrect(true);
      return;
    } else {
      setIsPassCorrect(false);
    }

    if (form.password !== form.confirmPassword) {
      setConfirmIsPassCorrect(true);
      return;
    } else {
      setConfirmIsPassCorrect(false);
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/changePassword", {
        email,
        password: form.password,
      });

      if (res.status === 200) {
        toast("✅ Password Updated Suceessfully");
        router.push("/sign-in");
      }
    } catch (error) {
      toast("❌ Failed to change Password. Please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Change your Password
        </h2>
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
          <div className="mt-1 text-xs text-red-500 space-y-0.5">
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
          <div className="mt-1 text-xs text-red-500">
            <p>
              <b>*</b> Passwords do not match
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-2 rounded-full bg-gradient-to-br from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Change Password"
        )}
      </Button>
    </div>
  );
}
