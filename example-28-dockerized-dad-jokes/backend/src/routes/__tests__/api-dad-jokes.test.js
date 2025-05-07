import { test, beforeAll, beforeEach, afterAll, expect, describe } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { DadJoke } from "../../data/schema";
import mongoose from "mongoose";
import request from "supertest";
import express, { Express } from "express";
import dadJokesRouter from "../api-dad-jokes.js";

// Test data
const testJokes = [
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000001"),
    text: "Joke Text 1"
  },
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000002"),
    text: "Joke Text 2"
  },
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000003"),
    text: "Joke Text 3"
  }
];

/** @type MongoMemoryServer */
let mongod;

/** @type Express */
let app;

// Setup
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use("/api/dad-jokes", dadJokesRouter);
});

// Close database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// Clear and re-initialize database before each test
beforeEach(async () => {
  await DadJoke.deleteMany({});
  await DadJoke.insertMany(testJokes);
});

describe("GET /api/dad-jokes", () => {
  test("should return all jokes", async () => {
    const response = await request(app).get("/api/dad-jokes").send().expect(200);

    const returnedJokes = response.body;
    expect(returnedJokes.length).toBe(3);
    expect(returnedJokes[0].text).toBe("Joke Text 1");
    expect(returnedJokes[1].text).toBe("Joke Text 2");
    expect(returnedJokes[2].text).toBe("Joke Text 3");
  });
});

describe("GET /api/dad-jokes/:id", () => {
  test("should return a joke by ID", async () => {
    const response = await request(app)
      .get("/api/dad-jokes/000000000000000000000001")
      .send()
      .expect(200);

    const returnedJoke = response.body;
    expect(returnedJoke._id).toBe("000000000000000000000001");
    expect(returnedJoke.text).toBe("Joke Text 1");
  });

  test("should return 404 for non-existing joke", async () => {
    await request(app).get("/api/dad-jokes/000000000000000000000999").send().expect(404);
  });
});

describe("GET /api/dad-jokes/random", () => {
  test("should return a random joke", async () => {
    const response = await request(app).get("/api/dad-jokes/random").send().expect(200);

    const returnedJoke = response.body;
    expect(returnedJoke.text).toBeOneOf(testJokes.map((joke) => joke.text));
  });

  test("should return 404 if no jokes exist", async () => {
    await DadJoke.deleteMany({});
    await request(app).get("/api/dad-jokes/random").send().expect(404);
  });
});

describe("POST /api/dad-jokes", () => {
  test("should create a new joke", async () => {
    const newJoke = { text: "New  Joke Text" };

    // Send request; make sure it returns 201 Created with Location header in the correct format
    const response = await request(app)
      .post("/api/dad-jokes")
      .send(newJoke)
      .expect(201)
      .expect("Location", /\/api\/dad-jokes\/[0-9a-f]{24}/);

    // Make sure the returned joke matches the one we sent
    const returnedJoke = response.body;
    expect(returnedJoke.text).toBe("New  Joke Text");
    expect(returnedJoke._id).toBeDefined();

    // Make sure the returned joke's id matches the one in the Location header
    const locationId = response.headers.location.split("/").pop();
    expect(returnedJoke._id.toString()).toBe(locationId);

    // Make sure the joke was saved in the database
    const dbJoke = await DadJoke.findById(returnedJoke._id);
    expect(dbJoke.text).toBe("New  Joke Text");
  });

  test("should return 422 for invalid joke", async () => {
    const invalidJoke = { text: "" };
    await request(app).post("/api/dad-jokes").send(invalidJoke).expect(422);

    // Check that the joke was not saved in the database
    const dbJokes = await DadJoke.find({});
    expect(dbJokes.length).toBe(3); // Should still be 3 jokes
  });

  test("should return 422 for missing joke text", async () => {
    const invalidJoke = {};
    await request(app).post("/api/dad-jokes").send(invalidJoke).expect(422);
  });

  test("should return 422 for non-string joke text", async () => {
    const invalidJoke = { text: 123 };
    await request(app).post("/api/dad-jokes").send(invalidJoke).expect(422);
  });

  test("should return 422 for empty joke text", async () => {
    const invalidJoke = { text: "   " };
    await request(app).post("/api/dad-jokes").send(invalidJoke).expect(422);
  });
});

describe("DELETE /api/dad-jokes/:id", () => {
  test("should delete a joke by ID", async () => {
    await request(app).delete("/api/dad-jokes/000000000000000000000001").send().expect(204);

    // Make sure the joke was deleted from the database
    const dbJoke = await DadJoke.findById("000000000000000000000001");
    expect(dbJoke).toBeNull();
  });

  test("should still return 204 for non-existing joke", async () => {
    await request(app).delete("/api/dad-jokes/000000000000000000000999").send().expect(204);

    // Make sure nothing was deleted
    const dbJokes = await DadJoke.find({});
    expect(dbJokes.length).toBe(3); // Should still be 3 jokes
  });
});
