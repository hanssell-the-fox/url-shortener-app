import { Collection, MongoClient } from "./deps.ts";
import { ConnectionOptions, Model } from "./mod.ts";

export let database: Collection<Model>;

export async function connectToMongoDB(config: ConnectionOptions) {
  const mongo = new MongoClient();

  try {
    await mongo.connect(Deno.env.get("MONGO_CONNECTION_URL")!);
    console.log("Connected with the Mongo database");
  } catch (_) {
    console.log("The attempt of connection with the database has failed...");
    return;
  }

  const db = mongo.database(config.database);
  database = db.collection<Model>(config.collection);
}
