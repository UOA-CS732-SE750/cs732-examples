import { it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Breakfast } from "../schema.js";

let mongod;

const breakfast1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  eggs: 7,
  bacon: 10,
  drink: "Coffee"
};

const breakfast2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  eggs: 12,
  bacon: 2
};

const breakfast3 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000003"),
  eggs: 8,
  bacon: 50,
  drink: "Tea"
};

const breakfasts = [breakfast1, breakfast2, breakfast3];

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString);
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
  // Drop existing collections
  await mongoose.connection.db.dropDatabase();
  // console.log("schema.test.js Dropped database");
  const coll = await mongoose.connection.db.createCollection("breakfasts");
  await coll.insertMany(breakfasts);
  // console.log("schema.test.js Inserted breakfasts");
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("gets breakfasts", async () => {
  const breakfastsFromDb = await Breakfast.find();
  expect(breakfastsFromDb).toBeTruthy();
  expect(breakfastsFromDb.length).toBe(3);

  expect(breakfastsFromDb[0].eggs).toBe(7);
  expect(breakfastsFromDb[0].bacon).toBe(10);
  expect(breakfastsFromDb[0].drink).toBe("Coffee");

  expect(breakfastsFromDb[1].eggs).toBe(12);
  expect(breakfastsFromDb[1].bacon).toBe(2);
  expect(breakfastsFromDb[1].drink).toBeUndefined();

  expect(breakfastsFromDb[2].eggs).toBe(8);
  expect(breakfastsFromDb[2].bacon).toBe(50);
  expect(breakfastsFromDb[2].drink).toBe("Tea");
});

it("gets a single breakfast", async () => {
  const breakfast = await Breakfast.findById("000000000000000000000002");
  expect(breakfast.eggs).toBe(12);
  expect(breakfast.bacon).toBe(2);
  expect(breakfast.drink).toBeUndefined();
});

it("adds a breakfast without crashing", async () => {
  const breakfast = new Breakfast({
    eggs: 9,
    bacon: 2,
    drink: "Tea"
  });

  await breakfast.save();

  const fromDb = await mongoose.connection.db
    .collection("breakfasts")
    .findOne({ _id: breakfast._id });
  expect(fromDb).toBeTruthy();
  expect(fromDb.eggs).toBe(9);
  expect(fromDb.bacon).toBe(2);
  expect(fromDb.drink).toBe("Tea");
});

it("fails when adding too few eggs", () => {
  const breakfast = new Breakfast({
    eggs: 5,
    bacon: 2,
    drink: "Tea"
  });

  return expect(breakfast.save()).rejects.toThrow();
});

it("fails when adding too many eggs", () => {
  const breakfast = new Breakfast({
    eggs: 13,
    bacon: 2,
    drink: "Tea"
  });

  return expect(breakfast.save()).rejects.toThrow();
});

it("fails when forgetting to add bacon", () => {
  const breakfast = new Breakfast({
    eggs: 7,
    drink: "Tea"
  });

  return expect(breakfast.save()).rejects.toThrow();
});

it("fails when forgetting to add a drink with enough bacon", () => {
  const breakfast = new Breakfast({
    eggs: 7,
    bacon: 4
  });

  return expect(breakfast.save()).rejects.toThrow();
});

it("fails when adding an incorrect kind of drink", () => {
  const breakfast = new Breakfast({
    eggs: 7,
    bacon: 1,
    drink: "Milkshake"
  });

  return expect(breakfast.save()).rejects.toThrow();
});

// etc...
