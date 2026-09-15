import { MongoClient, type Db } from 'mongodb';

const uri = process.env.mongodb_URL;
if (!uri) throw new Error('MONGODB_URL is not defined in environment variables');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'production') {
  const globalWithMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const mongoClient = await clientPromise;
  return mongoClient.db('sacrament-meetings');
}