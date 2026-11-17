import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB;
const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient> | undefined;

async function getClient() {
  if (!uri) throw new Error("MONGODB_URI is not configured.");

  if (process.env.NODE_ENV === "development") {
    globalForMongo.mongoClientPromise ??= new MongoClient(uri, { appName: "TechRodeo Portal" }).connect();
    return globalForMongo.mongoClientPromise;
  }

  clientPromise ??= new MongoClient(uri, { appName: "TechRodeo Portal" }).connect();
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClient();
  return client.db(databaseName || undefined);
}
