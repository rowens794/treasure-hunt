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
    const { req } = context;
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const apiUrl = `${protocol}://${host}/api/hunt-status`;

    const res = await fetch(apiUrl, {
      headers: {
        cookie: req.headers.cookie || "",
      },
    });

    if (!res.ok) {
      console.error(`API responded with status ${res.status}`);
      throw new Error(`API responded with status ${res.status}`);
    }

    const apiData = await res.json();

    if (!apiData.currentClue?._id) {
      console.log(
        "User is not authenticated or currentClue is missing, redirecting..."
      );
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        apiData,
      },
    };
  } catch (error) {
    return {
      props: {
        apiData: null,
        error: error,
      },
    };
  }
}
