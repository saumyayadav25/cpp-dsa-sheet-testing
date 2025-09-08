// Route file for interview experiences
// to POST and GET for all experiences in share page
import { NextResponse } from "next/server";
import InterviewExperience from "@/models/InterviewExperience.model";
import { connect } from "@/db/config";

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();

    // Create new interview experience
    const experience = await InterviewExperience.create(body);

    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 }
    );
  } catch (error: any) {
  console.error("Error saving experience:", error.message);
  return NextResponse.json(
    { success: false, message: error.message },
    { status: 500 }
  );
}
}

export async function GET() {
  try {
    await connect();

    // Fetch all interview experiences sorted by date (latest first)
    const experiences = await InterviewExperience.find().sort({ date: -1 });

    return NextResponse.json(
      { success: true, data: experiences },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
