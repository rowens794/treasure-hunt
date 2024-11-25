declare global {
  // Augment the NodeJS global type
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}

export {};
