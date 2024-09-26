"use client";

import { ChangeEvent, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Footer from "./components/footer";
import About from "./components/about";

export default function Home() {
  const ref = useRef("");

  const [result, setResult] = useState(null);
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  function textFiledText(e: ChangeEvent<HTMLInputElement>) {
    ref.current = e.target.value;
  }

  async function onSubmitLink() {
    setLoadingSearch(true);
    setResult(null);
    const link = ref.current;
    const post = await fetch("/api/linkedin-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: link }),
    });
    const postBody = await post.json();
    console.log("Link Post: ", postBody);
    const gpt = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: postBody.post }),
    });
    const gptJson = await gpt.json();

    const finalGPT = gptJson.choices[0].message.content;
    setResult(finalGPT);
    setLoadingSearch(false);
    console.log("GPT: ", gptJson.choices[0].message.content);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-5xl text-center p-6">Yapping GPT</h1>
      <main className="flex-grow">
        <h3 className="text-lg text-center p-4">
          Enter Linkedin link here to analyse the yappinges
        </h3>
        <div className="flex justify-center">
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-xs mx-4"
            placeholder="Enter Link"
            onChange={textFiledText}
          />
          <button
            className="btn btn-primary mx-2"
            onClick={onSubmitLink}
            disabled={isLoadingSearch}
          >
            {isLoadingSearch && (
              <span className="loading loading-spinner"></span>
            )}
            {!isLoadingSearch && "Start yappings"}
          </button>
        </div>

        <div className="p-4 bg-slate-500 rounded-lg m-8">
          <div className="text-center text-white">Yapping Result👇🏼</div>
          {result && (
            <TypeAnimation
              className="text-xl text-center p-12"
              sequence={[result, 1000]}
              repeat={0}
            />
          )}
        </div>
        <About />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
