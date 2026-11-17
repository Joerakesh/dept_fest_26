import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET() {
  try {
    const documents = await (await getDatabase()).collection("faqs")
      .find({ status: "PUBLISHED" }, { projection: { question: 1, answer: 1 } })
      .sort({ order: 1, createdAt: 1 }).toArray();
    const data = documents.filter((item) => typeof item.question === "string" && typeof item.answer === "string")
      .map(({ _id, question, answer }) => ({ id: _id.toString(), question, answer }));
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to load published FAQs", error);
    return NextResponse.json({ error: "FAQs are temporarily unavailable." }, { status: 503 });
  }
}