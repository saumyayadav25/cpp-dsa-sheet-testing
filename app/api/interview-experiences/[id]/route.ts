// Route file for interview experiences by ID
// to handle GET by ID (and later maybe PUT/DELETE).
import { NextResponse } from "next/server";
import InterviewExperience from "@/models/InterviewExperience.model";
import { connect } from "@/db/config";

export async function GET(_req: Request, context: any) {
  try {
    await connect();
    const { id } = context.params;

    const experience = await InterviewExperience.findById(id).lean();

    if (!experience) {
      return NextResponse.json(
        { success: false, message: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error("Error fetching interview by ID:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
