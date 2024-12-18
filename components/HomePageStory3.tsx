import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePageStory1({}) {
  return (
    <div className="pb-8">
      <h2 className="font-serif font-bold pb-2">Bailey Saves Town</h2>
      <HeroImage />

      <div className="relative">
        <p className="font-serif text-justify pt-2 leading-5">
          When Charleston faced a gunpowder shortage and looming danger, Anne
          Bailey braved a perilous solo journey through hostile wilderness to
          save the town. With grit, a rifle, and a horse, she defied all odds,
          returning as a hero.{" "}
          <Link
            href="/stories/bailey-saves-town"
            className="underline text-blue-800"
          >
            Read More
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

const HeroImage = () => {
  return (
    <div className="">
      <div className="border border-stone-600 relative ">
        <Image
          src="/anne-bailey.png"
          alt="hero"
          width={400}
          height={300}
          className="grayscale blur-[0.5px] opacity-60 contrast-100"
        />
        <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>
      </div>
      <div className="w-full text-right">
        <span className="text-xs italic">Bailey&apos;s 50-mile Journey</span>
      </div>
    </div>
  );
};
