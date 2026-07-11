import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { personalConfig } from "@/config/personal";

function promptConstructor(prompt: string) {
  return `Provide a single emoji for the following prompt: ${prompt}`;
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 },
    );
  }

  const apiKey = personalConfig.api.deepseekApiKey || process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "DeepSeek API key not configured" },
      { status: 500 },
    );
  }

  try {
    const openai = new OpenAI({
      apiKey,
      baseURL: "https://api.deepseek.com",
    });
    const completion = await openai.chat.completions.create({
      model: personalConfig.api.deepseekModel,
      messages: [{ role: "user", content: promptConstructor(prompt) }],
    });

    return NextResponse.json(
      { result: completion.choices[0].message.content },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { message: "Error generating completion", error: message },
      { status: 500 },
    );
  }
}
