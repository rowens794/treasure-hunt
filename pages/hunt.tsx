import { useRouter } from "next/router";
import { useEffect } from "react";

import { Session } from "next-auth"; // Import prebuilt Session type
import Controls from "@/components/hunt/Controls";
import VideoWithControls from "@/components/hunt/VideoWithControls";

interface Props {
  user: Session | null;
  authenticated: boolean;
}

function Hunt({ user, authenticated }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  return (
    <div className=" h-dvh w-full relative overflow-y-hidden">
      <VideoWithControls />
      <Controls user={user} />
    </div>
  );
}

export default Hunt;
