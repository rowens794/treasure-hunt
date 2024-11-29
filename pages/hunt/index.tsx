import Controls from "@/components/hunt/Controls";
import Video from "@/components/hunt/Video";
// import { GetServerSidePropsContext } from "next";

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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXTAUTH_URL}/api/hunt-status`,
//       {
//         method: "GET",
//         headers: {
//           cookie: context.req.headers.cookie || "", // Forward cookies
//         },
//       }
//     );

//     const data = await response.json();

//     return {
//       props: {
//         apiData: {
//           authenticated: true,
//           currentClue: data.currentClue,
//         },
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching API data:", error);
//     return {
//       props: {
//         apiData: null,
//         error: error,
//       },
//     };
//   }
// }
