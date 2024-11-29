import Controls from "@/components/hunt/Controls";
import Video from "@/components/hunt/Video";
import { GetServerSidePropsContext } from "next";

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
    const start = Date.now();
    // Make a call to your API route
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/hunt-status`, {
      headers: {
        cookie: context.req.headers.cookie || "", // Forward cookies for session handling
      },
    });

    const apiData = await res.json();

    // Redirect if the user is not authenticated
    if (!apiData.currentClue._id) {
      console.log("User is not authenticated, redirecting...");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    console.log("Server-side rendering took", Date.now() - start, "ms");

    return {
      props: {
        apiData,
      },
    };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return {
      props: {
        apiData: { error: "Failed to fetch data" },
      },
    };
  }
}
