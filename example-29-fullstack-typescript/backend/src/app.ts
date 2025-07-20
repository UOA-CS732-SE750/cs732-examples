import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import env from "./util/env";

// Sets our port to the PORT environment variable
// This uses a new file - env.ts - which allows us to 'type' our environment variables using Zod
const PORT = env.PORT;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import and use our application routes.
import routes from "./routes/routes";
app.use("/", routes);

// Start the DB running. Then, once it's connected, start the server.
await mongoose.connect(env.DB_URL);
app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
