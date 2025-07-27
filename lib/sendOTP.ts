import { sendEmail } from "./mail";

export const sendOtpEmail = async (email: string, otp: string) => {
  const html = `
    <div style="font-family: sans-serif;">
      <h2>Your OTP</h2>
      <p>Use the following OTP to verify your account:</p>
      <h1>${otp}</h1>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    html,
  });
};
