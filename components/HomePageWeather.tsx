import React from "react";
import Image from "next/image";

export default function HomeWeather({}) {
  return (
    <div className="w-full py-4 rounded-sm ">
      <div className="flex gap-4">
        <Image
          src="/farmer.png"
          alt="farmer Tom"
          width={100}
          height={100}
          className="rounded-md blur-[.25px] transform scale-x-[-1] opacity-70 translate-x-4"
        />
        <div className="flex justify-end flex-col w-full">
          <span className="girassol-regular text-2xl">Whittington&apos;s</span>
          <span className="girassol-regular text-4xl">Weather</span>
        </div>
      </div>
      <div className="flex justify-between border-stone-600 border-t-2 border-b-2 pt-2 pb-2">
        <WeatherCube
          time={["Morning", "AM"]}
          temp={54}
          condition={"rain-no-bg.png"}
        />
        <WeatherCube
          time={["Afternoon", "PM"]}
          temp={68}
          condition={"sunny-valley.png"}
        />
        <WeatherCube
          time={["Evening", "PM"]}
          temp={74}
          condition={"night.png"}
        />
      </div>
    </div>
  );
}

const WeatherCube = ({
  time,
  temp,
  condition,
}: {
  time: string[];
  temp: number;
  condition: string;
}) => {
  return (
    <div className="flex flex-col items-center px-2">
      {/* <span className="font-semibold text-lg">{temp}°</span> */}
      <div className="relative">
        <Image
          src={`/${condition}`}
          alt={condition}
          width={100}
          height={100}
          className="opacity-75 rounded-md aspect-square w-20"
        />
        {/* <span className="absolute top-0 right-0 font-semibold text-lg filter bg-blend-difference invert-0">
          {temp}°
        </span> */}
      </div>

      <span className="font-semibold mt-1 text-sm font-serif text-stone-700">
        {time[0]}
      </span>
    </div>
  );
};
