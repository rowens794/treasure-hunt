import withAuth from "../lib/withAuth";
// import Navbar from "../components/Navbar";
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
  console.log(user);
  return (
    <div className="flex flex-col h-screen">
      {/* Top scrollable section */}
      <div className="flex-1 overflow-y-scroll relative w-full bg-parchment pb-24">
        <NewsTooper />
        <div className="w-full px-8">
          <HomePageStory1 />
          <HomePageSignup />
          <HomePageStory2 />
          <HomePageWeather />
          <HomePageStory3 />
        </div>
      </div>

      {/* Fixed menu bar */}
      <Menu user={user} />
    </div>
  );
};

export default withAuth(Home);
