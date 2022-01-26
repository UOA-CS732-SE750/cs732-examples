import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Breakfast from '../schema';

let mongod;
let breakfast1, breakfast2, breakfast3;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection('breakfasts');

    breakfast1 = {
        eggs: 7,
        bacon: 10,
        drink: 'Coffee'
    };

    breakfast2 = {
        eggs: 12,
        bacon: 2,
    };

    breakfast3 = {
        eggs: 8,
        bacon: 50,
        drink: 'Tea'
    };

    await coll.insertMany([breakfast1, breakfast2, breakfast3]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection('breakfasts');
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it('gets breakfasts', async () => {

    const breakfasts = await Breakfast.find();
    expect(breakfasts).toBeTruthy();
    expect(breakfasts.length).toBe(3);

    expect(breakfasts[0].eggs).toBe(7);
    expect(breakfasts[0].bacon).toBe(10);
    expect(breakfasts[0].drink).toBe('Coffee');

    expect(breakfasts[1].eggs).toBe(12);
    expect(breakfasts[1].bacon).toBe(2);
    expect(breakfasts[1].drink).toBeUndefined();

    expect(breakfasts[2].eggs).toBe(8);
    expect(breakfasts[2].bacon).toBe(50);
    expect(breakfasts[2].drink).toBe('Tea');
});

it('gets a single breakfast', async () => {
    const breakfast = await Breakfast.findById(breakfast2._id);
    expect(breakfast.eggs).toBe(12);
    expect(breakfast.bacon).toBe(2);
    expect(breakfast.drink).toBeUndefined();
});

it('adds a breakfast without crashing', async () => {
    const breakfast = new Breakfast({
        eggs: 9,
        bacon: 2,
        drink: 'Tea'
    });

    await breakfast.save();

    const fromDb = await mongoose.connection.db.collection('breakfasts').findOne({ _id: breakfast._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.eggs).toBe(9);
    expect(fromDb.bacon).toBe(2);
    expect(fromDb.drink).toBe('Tea');
});

it('fails when adding too few eggs', () => {
    const breakfast = new Breakfast({
        eggs: 5,
        bacon: 2,
        drink: 'Tea'
    });

    return expect(breakfast.save()).rejects.toThrow();
});

it('fails when adding too many eggs', () => {
    const breakfast = new Breakfast({
        eggs: 13,
        bacon: 2,
        drink: 'Tea'
    });

    return expect(breakfast.save()).rejects.toThrow();
});

it('fails when forgetting to add bacon', () => {
    const breakfast = new Breakfast({
        eggs: 7,
        drink: 'Tea'
    });

    return expect(breakfast.save()).rejects.toThrow();
});

it('fails when forgetting to add a drink with enough bacon', () => {
    const breakfast = new Breakfast({
        eggs: 7,
        bacon: 4
    });

    return expect(breakfast.save()).rejects.toThrow();
});

it('fails when adding an incorrect kind of drink', () => {
    const breakfast = new Breakfast({
        eggs: 7,
        bacon: 1,
        drink: 'Milkshake'
    });

    return expect(breakfast.save()).rejects.toThrow();
});

// etc...