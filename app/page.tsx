"use client";

import { ChangeEvent, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

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
    <>
      <h1 className="text-5xl text-center p-8">Yapping GPT</h1>
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
          className="btn btn-primary "
          onClick={onSubmitLink}
          disabled={isLoadingSearch}
        >
          {isLoadingSearch && <span className="loading loading-spinner"></span>}
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
      <div className="flex w-full flex-col">
        <div className="divider"></div>
      </div>
      <h1 className="text-2xl text-center p-4">What&apos;s Yapping GPT?</h1>
      <p className="text-center px-8">
        Yapping GPT is model that detect yappings in linkedin post. It will take
        the link of the post and give you the summary. Becareful the model
        doesn&apos;t tolerate bullshit :)
      </p>
      <h1 className="text-2xl text-center p-4">How to use it?</h1>
      <p className="text-center px-8">
        Simply copy the link of a post and then paste the link on top
      </p>
    </>
  );
}
