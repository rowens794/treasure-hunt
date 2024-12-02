import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Message } from "@/interfaces/Hunt";

interface ApiResponse {
  messages?: Message[];
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
      const messages = await getMessages(session);
      res.status(200).json({ messages: messages });
    } catch (error) {
      console.error("Error fetching or creating hunt status:", error);
      res.status(500).json({
        authenticated: false,
      });
    }
  }
}

async function getMessages(session: Session | null): Promise<Message[]> {
  const user = session ? session.user : {};

  try {
    const response = await fetch(`${process.env.PROXY_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        secret: process.env.PROXY_SECRET,
      }),
    });

    // Read the response text for better error messages
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`);
    }

    // Attempt to parse the response as JSON
    const data = JSON.parse(responseText);

    return data.messages;
  } catch (error) {
    console.error("Error getting hunt status:", error);
    throw new Error("Error getting hunt status");
  }
}
