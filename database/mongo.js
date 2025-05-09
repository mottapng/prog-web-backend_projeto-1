import { MongoClient } from "mongodb";

const uri = "mongodb://admin:admin@localhost:27017";
const dbName = "entrega-service";

let client = null;
let db = null;

export async function connect() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(dbName);
      console.log("Connected to MongoDB successfully");
    }
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("MongoDB connection closed");
  }
}

export { db };
