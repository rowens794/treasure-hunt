// pages/api/check-location.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";
import { Db } from "mongodb";
import { HuntStatus, Clue, LocationCheck } from "@/interfaces/Hunt";

interface ApiResponse {
  authenticated: boolean | null;
  status?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ authenticated: null, status: "Method Not Allowed" });
  }

  // Get user ID from session
  const userId = await getUserIdFromSession(req, res);
  if (!userId) {
    return; // Response already sent in getUserIdFromSession
  }

  // Parse and validate coordinates
  const coordinates = parseCoordinates(req.body);
  if (!coordinates) {
    return res
      .status(400)
      .json({ authenticated: true, status: "Invalid coordinates" });
  }
  const { latitude, longitude } = coordinates;

  try {
    const db = await getDatabase();

    // Get or create user's hunt status
    const huntStatus = await getOrCreateUserHuntStatus(db, userId);

    // Get the current clue
    const currentClue = await getClueById(db, huntStatus.currentClue);

    if (!currentClue) {
      return res
        .status(404)
        .json({ authenticated: true, status: "Current clue not found" });
    }

    const { targetCoords, acceptableRadius } = currentClue;

    // Calculate the distance between user's location and target location
    const distanceInFeet = calculateDistanceInFeet(
      latitude,
      longitude,
      targetCoords.lat,
      targetCoords.lng
    );

    // Determine if the user is within the acceptable radius
    const isSuccessful = distanceInFeet <= acceptableRadius;

    // Log the location check
    await logLocationCheck(db, {
      userId,
      clueId: huntStatus.currentClue,
      timestamp: new Date(),
      coords: { lat: latitude, lng: longitude },
      success: isSuccessful,
    });

    if (isSuccessful) {
      // Update the user's hunt status (e.g., move to the next clue)
      await updateUserHuntStatus(db, userId, huntStatus.currentClue + 1);

      return res.status(200).json({
        authenticated: true,
        status: "success",
      });
    } else {
      return res.status(200).json({
        authenticated: true,
        status: "failure",
      });
    }
  } catch (error) {
    console.error("Error checking location:", error);
    return res.status(500).json({
      authenticated: true,
      status: "error",
    });
  }
}

// Helper function to get the database
async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  const db = client.db("test"); // Replace with your actual database name
  return db;
}

// Helper function to get user ID from session
async function getUserIdFromSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    res.status(401).json({ authenticated: false, status: "Unauthorized" });
    return null;
  }

  return session.user.id;
}

// Helper function to parse and validate coordinates
function parseCoordinates(body: {
  latitude: number;
  longitude: number;
}): { latitude: number; longitude: number } | null {
  const { latitude, longitude } = body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return null;
  }

  return { latitude, longitude };
}

// Helper function to get or create user's hunt status
async function getOrCreateUserHuntStatus(
  db: Db,
  userId: string
): Promise<HuntStatus> {
  const huntStatusCollection = db.collection<HuntStatus>("HuntStatus");

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
    huntStatus = { ...defaultStatus, _id: insertResult.insertedId };
  }

  return huntStatus;
}

// Helper function to get clue by ID
async function getClueById(db: Db, clueId: number): Promise<Clue | null> {
  const cluesCollection = db.collection<Clue>("Clues");
  const clue = await cluesCollection.findOne({ clueId });
  return clue;
}

// Helper function to update user's hunt status
async function updateUserHuntStatus(
  db: Db,
  userId: string,
  nextClueNumber: number
): Promise<void> {
  const huntStatusCollection = db.collection<HuntStatus>("HuntStatus");

  await huntStatusCollection.updateOne(
    { userId },
    {
      $set: {
        currentClue: nextClueNumber,
        updatedAt: new Date(),
        lastSolvedClue: new Date(),
      },
      $push: { clueProgress: new Date() },
    }
  );
}

// Helper function to log the location check
async function logLocationCheck(
  db: Db,
  locationCheck: LocationCheck
): Promise<void> {
  const locationChecksCollection =
    db.collection<LocationCheck>("LocationChecks");
  await locationChecksCollection.insertOne(locationCheck);
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
