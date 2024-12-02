import { NextApiRequest, NextApiResponse } from "next";
import { Message } from "@/interfaces/Hunt";

interface ApiResponse {
  messages?: Message[];
  authenticated?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const userId = req.body.userId;
  const messageId = req.body.messageId;

  if (!userId) {
    return res.status(401).json({ authenticated: false });
  } else {
    try {
      const messages = await markMessage(userId, messageId);
      res.status(200).json({ messages: messages });
    } catch (error) {
      console.error("Error fetching or creating hunt status:", error);
      res.status(500).json({
        authenticated: false,
      });
    }
  }
}

async function markMessage(
  userId: string,
  messageId: number
): Promise<Message[]> {
  try {
    const response = await fetch(`${process.env.PROXY_URL}/mark-message-read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.PROXY_SECRET,
        userId: userId,
        messageId: messageId,
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
