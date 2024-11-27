import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, reuse the MongoDB client across hot reloads
  //@ts-expect-error - globalThis is not defined in Next.js
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    //@ts-expect-error - globalThis is not defined in Next.js
    global._mongoClientPromise = client.connect();
  }
  //@ts-expect-error - globalThis is not defined in Next.js
  clientPromise = global._mongoClientPromise;
} else {
  // In production, reuse the MongoDB client across function calls
  //@ts-expect-error - globalThis is not defined in Next.js
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    //@ts-expect-error - globalThis is not defined in Next.js
    global._mongoClientPromise = client.connect();
  }
  //@ts-expect-error - globalThis is not defined in Next.js
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
