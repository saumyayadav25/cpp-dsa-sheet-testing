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
  const fromEmail = ProcessingInstruction.env.GOOGLE_APP_USER;
  if  ( !fromEmail) {
    throw new Error ("GOOGLE_APP_USER environment variable not set");
  }

  try {
    await transporter.sendMail({
      from: `"DSAMate" <${process.env.GOOGLE_APP_USER}>`,
      to,
      subject,
      html,
    });
    
  console.log("Email sent successfully");
  
  } catch (error) {
    console.log("Failed to send email", error);
  }
};
