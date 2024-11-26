import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb"; // Reuse your MongoDB utility
import { User } from "@/interfaces/User";
import { ObjectId } from "mongodb";

interface HuntStatus {
  _id?: ObjectId; // MongoDB document ID
  userId: string;
  lastSolvedClue: Date;
  currentClue: number;
  createdAt: Date;
  updatedAt: Date;
  clueProgress: Date[];
}

interface ApiResponse {
  authenticated: boolean | null;
  user?: User | null;
  currentClue?: {
    clueId: number;
    clueType: string;
    componentTemplate: string;
    videoUrl: string;
    videoPosterUrl: string;
  } | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const session = await getSession({ req });
  console.log(session);

  if (!session || !session.user) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    // Connect to MongoDB using the reusable clientPromise
    const client = await clientPromise;
    const db = client.db("test"); // Replace with your actual database name
    const collection = db.collection<HuntStatus>("HuntStatus"); // Explicitly type the collection

    // Query the hunts collection for the user's hunt status
    let huntStatus = await collection.findOne({ userId: session.user.id });

    if (!huntStatus) {
      // Create a new record if none exists
      const defaultStatus: HuntStatus = {
        userId: session.user.id,
        currentClue: 0,
        lastSolvedClue: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        clueProgress: [],
      };
      const insertResult = await collection.insertOne(defaultStatus);
      huntStatus = { ...defaultStatus, _id: insertResult.insertedId }; // Include the inserted document's ID
    }

    //once the hunt status is fetched or created, retrieve the clue information from the Clues collection
    const cluesCollection = db.collection("Clues");
    const currentClue = await cluesCollection.findOne({
      clueId: huntStatus.currentClue,
    });

    //add currentClue to the huntStatus object

    res.status(200).json({
      authenticated: true,
      user: {
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      },
      currentClue: {
        clueId: currentClue ? currentClue.clueId : 0,
        clueType: currentClue ? currentClue.clueType : "",
        componentTemplate: currentClue ? currentClue.componentTemplate : "",
        videoUrl: currentClue ? currentClue.videoUrl : "",
        videoPosterUrl: currentClue ? currentClue.videoPosterUrl : "",
      },
    });
  } catch (error) {
    console.error("Error fetching or creating hunt status:", error);
    res.status(500).json({
      authenticated: null,
      user: null,
      currentClue: null,
    });
  }
}
