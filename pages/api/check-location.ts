// pages/api/check-location.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "@/interfaces/User";

interface ApiResponse {
  authenticated: boolean | null;
  status?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const coordinates = parseCoordinates(req.body);
  const user = await getUserFromSession(req, res);
  validateRequest({ req, res, user, coordinates });

  try {
    if (user && coordinates) {
      const { userSuccessful } = await testLocation(user, coordinates);
      if (userSuccessful) {
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
    } else {
      return res.status(400).json({
        authenticated: true,
        status: "Invalid Request",
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

// Helper function to get user ID from session
async function getUserFromSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | null> {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    res.status(401).json({ authenticated: false, status: "Unauthorized" });
    return null;
  }

  const user: User = {
    id: session.user.id,
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "",
  };

  return user;
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

async function testLocation(
  user: User,
  coordinates: { latitude: number; longitude: number }
): Promise<{ userSuccessful: boolean }> {
  try {
    const response = await fetch(`${process.env.PROXY_URL}/test-location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        coordinates,
        secret: process.env.PROXY_SECRET,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting hunt status:", error);
    throw new Error("Error getting hunt status");
  }
}

interface ValidateRequestParams {
  req: NextApiRequest;
  res: NextApiResponse<ApiResponse>;
  user: User | null;
  coordinates: { latitude: number; longitude: number } | null;
}

function validateRequest({
  req,
  res,
  user,
  coordinates,
}: ValidateRequestParams): boolean | void {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ authenticated: null, status: "Method Not Allowed" });
  }

  if (!user) {
    return res
      .status(400)
      .json({ authenticated: true, status: "Invalid user" });
  }

  if (!coordinates) {
    return res
      .status(400)
      .json({ authenticated: true, status: "Invalid coordinates" });
  }

  return true;
}
