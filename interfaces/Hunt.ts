interface HuntStatus {
  _id?: string;
  userId: string;
  name: string;
  email: string;
  image: string;
  lastSolvedClue: Date;
  currentClue: number;
  createdAt: Date;
  updatedAt: Date;
  clueProgress: Date[];
}

interface Clue {
  _id?: string;
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
  _id?: string;
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
