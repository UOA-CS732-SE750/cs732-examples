import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { createArticle } from './articles-dao';
import { dummyArticles } from './random-articles';
import { Article } from './schema';

main();

async function main() {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addArticles();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

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