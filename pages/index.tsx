import withAuth from "../lib/withAuth";
// import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import NewsTooper from "@/components/NewsTooper";
import HomePageStory1 from "@/components/HomePageStory1";
import HomePageStory2 from "@/components/HomePageStory2";
import HomePageStory3 from "@/components/HomePageStory3";
import HomePageSignup from "@/components/HomePageSignup";
import HomePageWeather from "@/components/HomePageWeather";

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  console.log(user);
  return (
    <div className="relative w-full h-full bg-parchment pb-24">
      {/* <Navbar user={user} /> */}
      <div className="relative w-full bg-parchment">
        <NewsTooper />

        <div className="w-full px-8">
          <HomePageStory1 />
          <HomePageSignup />
          <HomePageStory2 />
          <HomePageWeather />
          <HomePageStory3 />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
