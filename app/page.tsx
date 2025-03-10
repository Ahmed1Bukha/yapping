/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Footer from "./components/footer";
import About from "./components/about";

export default function Home() {
  const ref = useRef("");

  const [result, setResult] = useState(null);
  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  function textFiledText(e: ChangeEvent<HTMLInputElement>) {
    ref.current = e.target.value;
  }

  async function onSubmitLink() {
    setLoadingSearch(true);
    setResult(null);
    setErrorMsg(null);
    const link = ref.current;
    const post = await fetch("/api/linkedin-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: link }),
    });

    const postBody = await post.json();
    if (post.status == 400) {
      setErrorMsg(postBody.error);
      setLoadingSearch(false);
      return;
    }
    console.log("Link Post: ", postBody);
    const gpt = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: postBody.post }),
    });
    const gptJson = await gpt.json();
    if (gptJson.status == 400) {
      setErrorMsg(gptJson.error);
      setLoadingSearch(false);
      return;
    }
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
        {errorMsg && (
          <p className="text-red-500 text-lg text-center mt-4">{errorMsg}</p>
        )}

        <div className="p-4 bg-slate-500 rounded-lg m-8">
          <div className="text-center text-white">Yapping Result👇🏼</div>
          {result && (
            <TypeAnimation
              className="text-xl p-12 text-white mx-6"
              style={{ textAlign: "center" }}
              sequence={[result, 800]}
              repeat={0}
            />
          )}
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.producthunt.com/posts/yappinggpt-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yappinggpt&#0045;2"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=494516&theme=light"
              alt="YappingGPT - Analyse&#0032;linkedin&#0032;post&#0032;and&#0032;give&#0032;you&#0032;yapping&#0032;result&#0032;of&#0032;it&#0046; | Product Hunt"
              width="250"
              height="54"
            />
          </a>
        </div>

        <About />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
