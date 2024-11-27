import { ObjectId } from "mongodb";

interface HuntStatus {
  _id?: ObjectId;
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
    lat: number;
    lng: number;
  };
  acceptableRadius: number; // in feet
}

interface LocationCheck {
  _id?: ObjectId;
  userId: string;
  clueId: number;
  timestamp: Date;
  coords: {
    lat: number;
    lng: number;
  };
  success: boolean;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export type { HuntStatus, Clue, Coordinates, LocationCheck };
