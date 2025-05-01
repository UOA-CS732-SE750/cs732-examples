import "dotenv/config";
import mongoose from "mongoose";
import { DadJoke } from "../data/schema.js";

await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("Connected to the database.");

await DadJoke.deleteMany({});

const dadJokes = [
  { text: "What do you call a fake noodle? An impasta!" },
  { text: "Why did the coffee file a police report? It got mugged." },
  { text: "How does a penguin build its house? Igloos it together." },
  { text: "Dad, did you get a haircut? No, I got them all cut!" },
  { text: "I would avoid the sushi if I was you. It’s a little fishy." },
  { text: "How do you organize a space party? You planet." },
  { text: "Why don’t skeletons fight each other? They don’t have the guts." },
  { text: "What do you call cheese that isn't yours? Nacho cheese." },
  { text: "Why couldn’t the bicycle stand up by itself? It was two tired." },
  { text: "What do you call a can opener that doesn’t work? A can’t opener." },
  { text: "Why don’t eggs tell jokes? They’d crack each other up." },
  { text: "What do you call a factory that makes okay products? A satisfactory." },
  { text: "Why did the scarecrow win an award? Because he was outstanding in his field." },
  { text: "Why don’t oysters donate to charity? Because they are shellfish." },
  { text: "What did the grape do when he got stepped on? Nothing but let out a little wine." },
  { text: "Why can’t your nose be 12 inches long? Because then it would be a foot." }
];

const response = await DadJoke.insertMany(dadJokes);
console.log(`Inserted ${response.length} dad jokes into the database.`);

await mongoose.disconnect();
console.log("Disconnected from the database.");
