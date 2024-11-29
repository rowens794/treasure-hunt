import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Clue } from "@/interfaces/Hunt";
import { Session } from "next-auth";

interface ApiResponse {
  currentClue?: Clue;
  authenticated?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const session = await getSession({ req });
  const user = session && session.user ? session.user : null;

  if (!user) {
    return res.status(401).json({ authenticated: false });
  } else {
    try {
      const clue = await getClue(session);

      res.status(200).json({ currentClue: clue });
    } catch (error) {
      console.error("Error fetching or creating hunt status:", error);
      res.status(500).json({
        authenticated: false,
      });
    }
  }
}

async function getClue(session: Session | null): Promise<Clue> {
  const user = session ? session.user : {};

  try {
    // Log the request details
    console.log("Making request to:", `${process.env.PROXY_URL}/hunt-status`);
    console.log("Request body:", {
      ...user,
      secret: process.env.PROXY_SECRET,
    });

    const response = await fetch(`${process.env.PROXY_URL}/hunt-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        secret: process.env.PROXY_SECRET,
      }),
    });

    // Log response status and headers
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers));

    // Read the response text for better error messages
    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`);
    }

    // Attempt to parse the response as JSON
    const data = JSON.parse(responseText);

    return data.huntStatus.currentClueData;
  } catch (error) {
    console.error("Error getting hunt status:", error);
    throw new Error("Error getting hunt status");
  }
}
