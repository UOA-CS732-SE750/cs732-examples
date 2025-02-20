import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { createArticle } from "./articles-dao.js";
import { dummyArticles } from "./random-articles.js";
import { Article } from "./schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

await clearDatabase();
console.log();

await addArticles();
console.log();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");

async function clearDatabase() {
  const articlesDeleted = await Article.deleteMany({});
  console.log(`Cleared database (removed ${articlesDeleted.deletedCount} articles).`);
}

async function addArticles() {
  for (let dummyArticle of dummyArticles) {
    const dbArticle = await createArticle(dummyArticle);
    console.log(`Article '${dbArticle.title}' added to database (_id = ${dbArticle._id})`);
  }
}
