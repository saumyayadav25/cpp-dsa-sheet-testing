import { NextResponse } from "next/server";
import { testEmailConfiguration, isEmailServiceConfigured } from "@/lib/mail";

export async function GET() {
  try {
    const configTest = testEmailConfiguration();
    const isConfigured = isEmailServiceConfigured();

    return NextResponse.json({
      emailServiceConfigured: isConfigured,
      configurationTest: configTest,
      environment: {
        hasGoogleAppUser: !!process.env.GOOGLE_APP_USER,
        hasGoogleAppPassword: !!process.env.GOOGLE_APP_PASSWORD,
        nodeEnv: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to test email configuration",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
