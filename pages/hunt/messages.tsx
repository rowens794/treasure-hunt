import Controls from "@/components/hunt/Controls";
import MessageList from "@/components/hunt/MessageList";
import { Message } from "@/interfaces/Hunt";
import { GetServerSidePropsContext } from "next";

interface Props {
  apiData: {
    authenticated: boolean;
    messages: Message[];
  };
}

function Hunt({ apiData }: Props) {
  return (
    <div className="h-dvh w-full relative overflow-y-hidden">
      {apiData ? <MessageList messages={apiData.messages} /> : null}

      <Controls />
    </div>
  );
}

export default Hunt;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/messages`, {
      method: "GET",
      headers: {
        cookie: context.req.headers.cookie || "", // Forward cookies
        accept: "application/json",
      },
    });

    const data = await response.json();

    return {
      props: {
        apiData: {
          authenticated: true,
          messages: data.messages,
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
