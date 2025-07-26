"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface OtpInputProps {
  email: string;
  open: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export default function OtpInput({
  email,
  open,
  onClose,
  onVerify,
}: OtpInputProps) {
  const [otp, setOtp] = useState("");

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        "/api/resendOtp",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast("✅ OTP sent");
      console.log(res.data.message);
      
    } catch (error) {
      toast("❌ Failed to send OTP. Please try again");
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) onVerify(otp);
  };

  useEffect(() => {
    if (!open) setOtp("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] sm:max-w-sm md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the 6-digit OTP sent to <strong>{email}</strong>.
        </p>

        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
          <InputOTPGroup className="flex justify-center items-center w-full gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <InputOTPSlot
                key={idx}
                index={idx}
                className="w-10 h-10 md:w-16 md:h-16 text-3xl text-blue-500"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="mt-4 flex justify-end">
          <Button
            disabled={otp.length !== 6}
            onClick={handleSubmit}
            className="cursor-pointer"
          >
            Verify
          </Button>
        </div>

        <div className="text-center text-sm text-gray-700">
          <p>
            Didn't receive a code?{" "}
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              className="text-blue-600 m-0 p-0 hover:underline"
            >
              Resend Code
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
