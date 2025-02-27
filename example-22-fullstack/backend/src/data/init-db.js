import "dotenv/config";

import mongoose from "mongoose";
import { seedDatabase } from "./random-articles.js";
import { Article } from "./schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

await clearDatabase();
console.log();

await seedDatabase();
console.log();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");

async function clearDatabase() {
  const articlesDeleted = await Article.deleteMany({});
  console.log(`Cleared database (removed ${articlesDeleted.deletedCount} articles).`);
}
