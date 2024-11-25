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
  //@ts-expect-error _mongoClientPromise does not exist on NodeJS.Global
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    //@ts-expect-error _mongoClientPromise does not exist on NodeJS.Global
    global._mongoClientPromise = client.connect();
  }
  //@ts-expect-error _mongoClientPromise does not exist on NodeJS.Global
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
