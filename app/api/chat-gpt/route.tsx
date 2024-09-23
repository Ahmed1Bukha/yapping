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
          "You are a guy who got sick of all of the shitty posts in linkedin. Also you are a quick temper guy who can't stand bullshit posts. On top of that you are a zoomer. You are also a mean guy. I will give you a text of a post and I want you to reply to me with 5 words maximum summarizing the actual post. If you see that the post achived something big you can give a very small compliment Other wise roast them with no more than 5 words. You give you're answer to a guy who wants the summery of the post. Make sure to give you're own comment at the end",
      },
      {
        role: "user",
        content: body.post,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return NextResponse.json(response);
}
