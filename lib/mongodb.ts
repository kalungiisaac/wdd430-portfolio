import { MongoClient, type Db } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const uri = process.env.mongodb_URL;
  if (!uri) throw new Error('MONGODB_URL is not defined in environment variables');

  client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const mongoClient = await getClientPromise();
  return mongoClient.db('sacrament-meetings');
}