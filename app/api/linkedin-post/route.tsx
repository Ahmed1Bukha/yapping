import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const link = body.link;
  const response = await fetch(link);

  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const post = document.querySelector(".break-words")?.textContent;
  console.log("Post: ", post);
  return NextResponse.json({
    post: post,
  });
}
