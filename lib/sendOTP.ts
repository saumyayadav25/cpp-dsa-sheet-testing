import { sendEmail } from "./mail";

export const sendOtpEmail = async (email: string, otp: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const html = `
      <div style="font-family: sans-serif;">
        <h2>Your OTP</h2>
        <p>Use the following OTP to verify your account:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;

    const result = await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html,
    });

    if (!result.success) {
      console.error("Failed to send OTP email:", result.error);
      return { success: false, error: result.error };
    }

    console.log("OTP email sent successfully:", result.messageId);
    return { success: true };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in sendOtpEmail:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
