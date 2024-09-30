import React from "react";
import Image from "next/image";
import HowToUse from "../images/HowToUse.png";
const About = () => {
  return (
    <div>
      <div className="">
        <div className="divider"></div>
      </div>
      <h1 className="text-2xl text-center p-4">What&apos;s Yapping GPT?</h1>
      <p className="text-center px-8">
        Cut through the noise with Yapping GPT—your no-nonsense assistant for
        LinkedIn posts. Just drop in a post link, and watch as we strip away the
        fluff, leaving you with nothing but the hard facts. Designed for those
        who can&apos;t stand the BS and crave straight-up insights.
      </p>
      <h1 className="text-2xl text-center p-4">How to use it?</h1>
      <p className="text-center px-8">
        Simply copy the link of a post and then paste the link on top
      </p>
      <Image
        src={HowToUse}
        height={300}
        alt="How to use image"
        className="mx-auto rounded-xl shadow-md  my-2 lg:w-1/5 sm:w-1/2"
      />
      <figcaption className=" mt-2 text-sm text-center text-gray-800 p-4">
        How to copy link
      </figcaption>
    </div>
  );
};

export default About;
