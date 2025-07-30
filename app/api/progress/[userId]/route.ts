import { NextResponse } from "next/server";
import {connect} from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";

interface Params {
  params: { userId: string };
}

export async function GET(_req: Request, { params }: Params) {
  try {
    await connect();
    const { userId } = params;

    const progress = await Progress.findOne({ userId });
    const badgeDoc = await Badge.findOne({ userId });

    return NextResponse.json({
      progress,
      badges: badgeDoc?.badges || []
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
