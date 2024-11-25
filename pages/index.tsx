import { Session } from "next-auth"; // Import prebuilt Session type
import NewsTooper from "@/components/NewsTooper";
import HomePageStory1 from "@/components/HomePageStory1";
import HomePageStory2 from "@/components/HomePageStory2";
import HomePageStory3 from "@/components/HomePageStory3";
import HomePageSignup from "@/components/HomePageSignup";
import HomePageWeather from "@/components/HomePageWeather";
import Menu from "@/components/Menu";

import { useSession } from "next-auth/react";

interface HomeProps {
  user: Session | null;
}

const Home: React.FC<HomeProps> = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="relative w-full bg-parchment pb-24">
      <Menu user={session} />
      <NewsTooper />
      <div className="w-full px-8">
        <HomePageStory1 />
        <HomePageSignup user={session} />
        <HomePageStory2 />
        <HomePageWeather />
        <HomePageStory3 />
      </div>
    </div>
  );
};

export default Home;
