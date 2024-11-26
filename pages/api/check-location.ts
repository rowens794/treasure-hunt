// pages/api/check-location.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"; // Correct import for server-side
import { authOptions } from "../api/auth/[...nextauth]"; // Adjust the path as necessary
import clientPromise from "@/lib/mongodb";
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

interface Clue {
  _id?: ObjectId;
  clueId: number;
  clueType: string;
  componentTemplate: string;
  videoUrl: string;
  videoPosterUrl: string;
  targetCoords: {
    latitude: number;
    longitude: number;
  };
  acceptableRadius: number; // in feet
}

interface ApiResponse {
  authenticated: boolean | null;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ authenticated: null, message: "Method Not Allowed" });
  }

  // Use getServerSession instead of getSession
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res
      .status(401)
      .json({ authenticated: false, message: "Unauthorized" });
  }

  const userId = session.user.id; // Adjust this based on how your user ID is stored

  const { latitude, longitude } = req.body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res
      .status(400)
      .json({ authenticated: true, message: "Invalid coordinates" });
  }

  try {
    // Connect to MongoDB using the reusable clientPromise
    const client = await clientPromise;
    const db = client.db("test"); // Replace with your actual database name

    // Access the HuntStatus collection
    const huntStatusCollection = db.collection<HuntStatus>("HuntStatus");

    // Query the hunts collection for the user's hunt status
    let huntStatus = await huntStatusCollection.findOne({ userId: userId });

    if (!huntStatus) {
      // Create a new record if none exists
      const defaultStatus: HuntStatus = {
        userId: userId,
        currentClue: 0,
        lastSolvedClue: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        clueProgress: [],
      };
      const insertResult = await huntStatusCollection.insertOne(defaultStatus);
      huntStatus = { ...defaultStatus, _id: insertResult.insertedId }; // Include the inserted document's ID
    }

    // Retrieve the current clue information from the Clues collection
    const cluesCollection = db.collection<Clue>("Clues");
    const currentClue = await cluesCollection.findOne({
      clueId: huntStatus.currentClue,
    });

    if (!currentClue) {
      return res
        .status(404)
        .json({ authenticated: true, message: "Current clue not found" });
    }

    const { targetCoords, acceptableRadius } = currentClue;

    // Calculate the distance between user's location and target location
    const distanceInFeet = calculateDistanceInFeet(
      latitude,
      longitude,
      targetCoords.latitude,
      targetCoords.longitude
    );

    // Check if the user is within the acceptable radius
    if (distanceInFeet <= acceptableRadius) {
      // Update the user's hunt status (e.g., move to the next clue)
      await huntStatusCollection.updateOne(
        { userId: userId },
        {
          $set: {
            currentClue: huntStatus.currentClue + 1,
            updatedAt: new Date(),
            lastSolvedClue: new Date(),
          },
          $push: { clueProgress: new Date() },
        }
      );

      return res.status(200).json({
        authenticated: true,
        message: "Congratulations! You've found the clue!",
      });
    } else {
      return res.status(200).json({
        authenticated: true,
        message: "You are not at the correct location yet. Keep looking!",
      });
    }
  } catch (error) {
    console.error("Error checking location:", error);
    return res.status(500).json({
      authenticated: true,
      message: "Internal Server Error",
    });
  }
}

// Helper function to calculate distance between two coordinates in feet
function calculateDistanceInFeet(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const earthRadiusMiles = 3958.8; // Radius of the Earth in miles

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInMiles = earthRadiusMiles * c;
  const feetPerMile = 5280;

  return distanceInMiles * feetPerMile;
}
