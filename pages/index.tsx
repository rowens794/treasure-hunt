import React from "react";
import { useSession } from "next-auth/react";
import NewsTooper from "@/components/NewsTooper";
import HomePageStory1 from "@/components/HomePageStory1";
import HomePageStory2 from "@/components/HomePageStory2";
import HomePageStory3 from "@/components/HomePageStory3";
import HomePageSignup from "@/components/HomePageSignup";
import HomePageWeather from "@/components/HomePageWeather";
import Menu from "@/components/Menu";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // While checking the authentication status, don't render anything
    return null; // Or you can return a loading indicator if preferred
  }

  return (
    <div className="relative w-full bg-parchment pb-24">
      <Menu user={session} />
      <NewsTooper />
      <div className="w-full px-8">
        <HomePageStory1 />
        <HomePageSignup />
        <HomePageStory2 />
        <HomePageWeather />
        <HomePageStory3 />
      </div>
    </div>
  );
};

export default Home;
