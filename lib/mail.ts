import nodemailer from "nodemailer";

// Type definitions for better type safety
interface EmailConfig {
  to: string;
  subject: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Validate required environment variables
const validateEmailConfig = (): { user: string; pass: string } => {
  const user = process.env.GOOGLE_APP_USER;
  const pass = process.env.GOOGLE_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Email configuration missing: GOOGLE_APP_USER and GOOGLE_APP_PASSWORD must be set"
    );
  }

  return { user, pass };
};

// Create transporter with validated config
const createTransporter = () => {
  try {
    const { user, pass } = validateEmailConfig();
    
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  } catch (error) {
    console.error("Failed to create email transporter:", error);
    throw error;
  }
};

export const sendEmail = async (config: EmailConfig): Promise<EmailResult> => {
  try {
    // Validate input
    if (!config.to || !config.subject || !config.html) {
      throw new Error("Invalid email configuration: to, subject, and html are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(config.to)) {
      throw new Error(`Invalid email address: ${config.to}`);
    }

    const transporter = createTransporter();
    const { user } = validateEmailConfig();

    const mailOptions = {
      from: `"DSAMate" <${user}>`,
      to: config.to,
      subject: config.subject,
      html: config.html,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to send email:", error);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Helper function to check if email service is properly configured
export const isEmailServiceConfigured = (): boolean => {
  try {
    validateEmailConfig();
    return true;
  } catch {
    return false;
  }
};

// Test function to validate email configuration (for development/testing)
export const testEmailConfiguration = (): { valid: boolean; error?: string } => {
  try {
    const { user, pass } = validateEmailConfig();
    
    // Basic validation
    if (!user.includes('@') || !pass || pass.length < 8) {
      return { 
        valid: false, 
        error: "Invalid email or password format" 
      };
    }

    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};
