// utils/getClue.ts
import { Session } from "next-auth";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

interface Clue {
  clueId: number;
  clueType: string;
  componentTemplate: string;
  videoUrl: string;
  videoPosterUrl: string;
  // Add any other properties as needed
}

export async function getClue(session: Session): Promise<Clue> {
  const user = session.user;

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
    throw error; // Re-throw the error to be handled by the caller
  }
}
