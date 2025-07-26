import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    await transporter.sendMail({
      from: `"Essentia.ai" <${process.env.GOOGLE_APP_USER}>`,
      to,
      subject,
      html,
    });
  
  } catch (error) {
    console.log("Failed to send email", error);
  }
};
