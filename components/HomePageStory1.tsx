import React from "react";
import Image from "next/image";

export default function HomePageStory1({}) {
  return (
    <div className="pb-8">
      <h2 className="font-serif font-bold pb-2">
        There&apos;s Money Hidden in Charleston
      </h2>
      <HeroImage />
      <p className="font-serif text-justify pt-2 leading-5">
        A local historian has unearthed a manuscript from the late Benjamin
        Strother detailing the existance of a hidden treasure trove in
        Charleston. No details about the location of cache exist, but local
        treasure hunters are out in force to find the missing haul.{" "}
        <a href="https:www.google.com" className=" underline text-blue-800">
          More details on page 6
        </a>
        .
      </p>
    </div>
  );
}

const HeroImage = () => {
  return (
    <>
      <div className="border rounded-sm border-stone-600 relative overflow-hidden">
        <Image
          src="/capital.jpg"
          alt="hero"
          width={400} // Specify desired width
          height={300} // Specify desired height
          className="grayscale blur-[0.5px] opacity-60 contrast-100"
        />

        <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>
      </div>
      <div className="w-full text-right">
        <span className="text-xs italic">Charleston Capital Building</span>
      </div>
    </>
  );
};
