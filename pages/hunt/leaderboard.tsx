import Controls from "@/components/hunt/Controls";
import Leaderboard from "@/components/hunt/Leaderboard";
import { Leader } from "@/interfaces/Hunt";
import { GetServerSidePropsContext } from "next";

interface Props {
  apiData: {
    authenticated: boolean;
    leaderboard: Leader[];
  };
}

function Hunt({ apiData }: Props) {
  return (
    <div className="h-dvh w-full relative overflow-y-hidden">
      {apiData ? <Leaderboard leaderboard={apiData.leaderboard} /> : null}

      <Controls />
    </div>
  );
}

export default Hunt;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/leaderboard`,
      {
        method: "GET",
        headers: {
          cookie: context.req.headers.cookie || "", // Forward cookies
          accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return {
      props: {
        apiData: {
          authenticated: true,
          leaderboard: data.leaderboard,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        apiData: null,
        error: error,
      },
    };
  }
}
