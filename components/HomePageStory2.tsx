import React from "react";
import Image from "next/image";

export default function HomePageStory1({}) {
  return (
    <div className="pb-8">
      <h2 className="font-serif font-bold pb-2">
        Local Business Man Reports Find
      </h2>
      <div className="relative">
        <HeroImage />
        <p className="font-serif text-justify pt-2 leading-5">
          While performing bakery renovations on Tuesday last week, local
          business man Jacob Strother, found a note written by his
          great-great-grandfather, Benjamin Strother, detailing an unexpected
          windfall of $500. The late Strother noted he had no plans or current
          need of the money.{" "}
          <a href="https:www.google.com" className="underline text-blue-800">
            More details on page 3
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const HeroImage = () => {
  return (
    <div
      className="border rounded-full border-stone-600 relative overflow-hidden float-right ml-4 mb-2"
      style={{ width: "120px", height: "120px" }}
    >
      <Image
        src="/headshot.png"
        alt="hero"
        width={150}
        height={150}
        className="grayscale blur-[0.5px] opacity-60 contrast-100 rounded-full"
      />
      <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>
    </div>
  );
};
