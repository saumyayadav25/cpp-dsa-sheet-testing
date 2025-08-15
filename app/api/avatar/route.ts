//C:\Users\Administrator\cpp-dsa-sheet-testing\app\api\avatar\route.js

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

function isJwtPayload(obj: unknown): obj is JwtPayload {
  return typeof obj === "object" && obj !== null && "id" in obj;
}

async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (isJwtPayload(decoded)) return decoded.id;
    return null;
  } catch {
    return null;
  }
}

// Upload or replace avatar
export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const mimeType = file.type;
    const size = file.size;

    if (!/^image\/(png|jpeg|jpg|webp)$/.test(mimeType)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    if (size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    await User.findByIdAndUpdate(userId, { avatar: dataUrl }, { new: true });

    return NextResponse.json({ avatar: dataUrl }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Remove avatar
export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await User.findByIdAndUpdate(userId, { avatar: null }, { new: true });

    return NextResponse.json({ avatar: null }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
