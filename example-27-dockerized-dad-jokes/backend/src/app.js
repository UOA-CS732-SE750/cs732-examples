// Configure environment variables
import "dotenv/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

app.use(cors());

app.use(express.json());
// app.use(express.static("public"));

// Our routes
app.get("/", (req, res) => {
    return res.json({ message: "Hello, world!" });
});

import apiRoutes from "./routes/api.js";
app.use("/api", apiRoutes);

await mongoose.connect(process.env.DB_CONNECTION_STRING);

// Start the server running.
app.listen(PORT, () => {
    console.log(`CS732 Dad Jokes example backend listening on port ${PORT}`);
});
