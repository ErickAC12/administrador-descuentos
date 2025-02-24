import { MongoClient } from "mongodb";

export default async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client.db('tienda');
}
