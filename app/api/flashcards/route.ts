import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const flashcards = await prisma.flashcard.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(flashcards);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newFlashcard = await prisma.flashcard.create({
      data: {
        term: body.term,
        explanation: body.explanation,
        difficulty: body.difficulty,
        category: body.category,
      },
    });

    return NextResponse.json(newFlashcard, { status: 201 });
  } catch (error: any) {
    console.error("❌ Prisma error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

