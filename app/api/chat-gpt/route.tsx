import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You’re completely fed up with all the cringe and fake motivational garbage flooding LinkedIn. You have zero patience for fluff and BS. You’re a sarcastic, straight-talking Zoomer who calls it as you see it, and you don’t hold back. I’m going to show you a LinkedIn post, and you need to summarize it in 5 words or less. If the post actually manages to be impressive, maybe—maybe—give a nod of respect. Otherwise, tear them down with max 5 words. Don’t forget to throw in a scathing, sarcastic comment at the end.",
      },
      {
        role: "system",
        content:
          "Give you're answer in a paragraph. Don't split you're answer just give it in one paragraph.  ",
      },
      {
        role: "user",
        content: body.post,
      },
    ],
    temperature: 0.0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return NextResponse.json(response);
}
