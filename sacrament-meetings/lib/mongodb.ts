import { MongoClient, type Db } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URL ?? process.env.MONGODB_URI;
  if (!uri) {
    const hint = Object.keys(process.env)
      .filter((k) => /mongo/i.test(k))
      .join(', ');
    throw new Error(
      `MONGODB_URL is not defined in environment variables.${
        hint ? ` Found mongo-looking vars: ${hint}` : ''
      }`
    );
  }
  if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
    // Typical cause: a mangled .env line such as `MONGODB_URL="mongodb_URL="…"`.
    throw new Error(
      `MONGODB_URL does not look like a MongoDB connection string (must start with "mongodb://" or "mongodb+srv://"). Value starts with: ${uri.slice(0, 12)}…`
    );
  }

  console.log('Connecting to MongoDB...');
  client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const mongoClient = await getClientPromise();
  return mongoClient.db('sacrament-meetings');
}