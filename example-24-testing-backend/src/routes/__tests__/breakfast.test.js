import routes from '../breakfast';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;
let breakfast1, breakfast2, breakfast3;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {

    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

    app = express();
    app.use('/', routes);
    server = app.listen(3000, () => done());

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
 * 
 * Also, stop the express server
 */
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('gets all breakfasts from server', async () => {

    const response = await axios.get('http://localhost:3000/breakfasts');
    const breakfasts = response.data;

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

it('gets a single breakfast from the server', async () => {

    const response = await axios.get(`http://localhost:3000/breakfasts/${breakfast2._id}`);
    const breakfast = response.data;

    expect(breakfast.eggs).toBe(12);
    expect(breakfast.bacon).toBe(2);
    expect(breakfast.drink).toBeUndefined();
});