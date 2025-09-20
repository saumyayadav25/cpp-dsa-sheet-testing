import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "flashcards.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Read existing flashcards
    const fileData = fs.readFileSync(filePath, "utf-8");
    const flashcards = JSON.parse(fileData);

    // Create new flashcard with id
    const newFlashcard = {
      id: flashcards.length ? flashcards[flashcards.length - 1].id + 1 : 1,
      ...body,
    };

    // Append and save
    flashcards.push(newFlashcard);
    fs.writeFileSync(filePath, JSON.stringify(flashcards, null, 2));

    return NextResponse.json({ success: true, flashcard: newFlashcard });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
