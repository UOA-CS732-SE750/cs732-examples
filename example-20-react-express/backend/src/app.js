// Configure environment variables
import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);

// Serve up the frontend's "dist" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {

  console.log("Running in production!");

  // Make all files in that folder public
  app.use(express.static("../frontend/dist"));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get("*", (req, res) => {
    res.sendFile("../frontend/dist/index.html");
  });
}

// Start the server running.
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
