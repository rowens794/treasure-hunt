import withAuth from "../lib/withAuth";
import User from "../interfaces/User";
import NewsTooper from "@/components/NewsTooper";
import HomePageStory1 from "@/components/HomePageStory1";
import HomePageStory2 from "@/components/HomePageStory2";
import HomePageStory3 from "@/components/HomePageStory3";
import HomePageSignup from "@/components/HomePageSignup";
import HomePageWeather from "@/components/HomePageWeather";
import Menu from "@/components/Menu";

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="relative w-full bg-parchment pb-24">
      <Menu user={user} />
      <NewsTooper />
      <div className="w-full px-8">
        <HomePageStory1 />
        <HomePageSignup user={user} />
        <HomePageStory2 />
        <HomePageWeather />
        <HomePageStory3 />
      </div>
    </div>
  );
};

export default withAuth(Home);
