import Controls from "@/components/hunt/Controls";
import Video from "@/components/hunt/Video";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getClue } from "@/utils/getClue"; // Adjust the import path as needed

interface Props {
  apiData: {
    authenticated: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    currentClue: {
      clueId: number;
      clueType: string;
      componentTemplate: string;
      videoUrl: string;
      videoPosterUrl: string;
    };
  };
}

function Hunt({ apiData }: Props) {
  console.log(apiData);
  return (
    <div className="h-dvh w-full relative overflow-y-hidden">
      {apiData && apiData.currentClue ? (
        <Video
          videoPosterUrl={apiData.currentClue.videoPosterUrl}
          videoUrl={apiData.currentClue.videoUrl}
        />
      ) : null}

      <Controls />
    </div>
  );
}

export default Hunt;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await getSession(context);

    if (!session || !session.user) {
      console.log("User is not authenticated, redirecting...");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const clue = await getClue(session);

    if (!clue) {
      console.log("No clue found, redirecting...");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        apiData: {
          authenticated: true,
          currentClue: clue,
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
