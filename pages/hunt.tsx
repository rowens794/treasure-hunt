import { useRouter } from "next/router";
import { useEffect } from "react";

import User from "../interfaces/User";
import withAuth from "../lib/withAuth";
import Controls from "@/components/hunt/Controls";
import VideoWithControls from "@/components/hunt/VideoWithControls";

interface Props {
  user: User;
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

export default withAuth(Hunt);
