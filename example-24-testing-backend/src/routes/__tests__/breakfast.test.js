import routes from '../breakfast';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';

let mongod;

// Create Express server. We don't need to start or stop it ourselves - we'll use the supertest package to manage this for us.
const app = express();
app.use('/', routes);

const breakfast1 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    eggs: 7,
    bacon: 10,
    drink: 'Coffee'
};

const breakfast2 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    eggs: 12,
    bacon: 2,
};

const breakfast3 = {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    eggs: 8,
    bacon: 50,
    drink: 'Tea'
};

const breakfasts = [breakfast1, breakfast2, breakfast3];

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {

    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {

    // Drop existing db
    await mongoose.connection.db.dropDatabase();

    const coll = await mongoose.connection.db.createCollection('breakfasts');
    await coll.insertMany(breakfasts);
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// Using describe() to group tests according to which endpoint being tested is good practice.
describe('GET /breakfasts', () => {

    /**
     * Tests that, when requesting all breakfasts, a 200 OK response is returned,
     * with the response body containing an array of all breakfasts in the database.
     */
    it('gets all breakfasts from server', (done) => {

        request(app) // "app" is the Express server we're testing
            .get('/breakfasts') // This is the URL we're invoking. And we're sending a GET request to it.
            .send() // Send the request. If we were sending a POST request, we would send the data as an argument to this function.
            .expect(200) // Expect the response to have a status code of 200 (OK).
            .end((err, res) => { // If all the above goes well, this function will be called. We can add any additional Jest tests in here, and call done() when finished.

                // If "err" is defined, it means there was a problem and we should fail the test.
                // We can do this by calling "done", supplying the error object.
                if (err) {
                    return done(err);
                }

                // res.body contains the data sent from the server.
                const breakfastsFromApi = res.body;

                // Normal Jest tests.
                expect(breakfastsFromApi).toBeTruthy();
                expect(breakfastsFromApi.length).toBe(3);

                expect(breakfastsFromApi[0].eggs).toBe(7);
                expect(breakfastsFromApi[0].bacon).toBe(10);
                expect(breakfastsFromApi[0].drink).toBe('Coffee');

                expect(breakfastsFromApi[1].eggs).toBe(12);
                expect(breakfastsFromApi[1].bacon).toBe(2);
                expect(breakfastsFromApi[1].drink).toBeUndefined();

                expect(breakfastsFromApi[2].eggs).toBe(8);
                expect(breakfastsFromApi[2].bacon).toBe(50);
                expect(breakfastsFromApi[2].drink).toBe('Tea');

                // Call done() when finished
                return done();
            });
    });
});


describe('GET /breakfasts/:id', () => {

    /**
     * Tests that, when requesting a single breakfast with a valid id, a 200 OK response is returned, with the matching
     * breakfast in the response body.
     */
    it('gets a single breakfast from the server', (done) => {

        request(app)
            .get('/breakfasts/000000000000000000000002')
            .send()
            .expect(200)
            .end((err, res) => {
    
                if (err) return done(err);
    
                const breakfast = res.body;
                expect(breakfast.eggs).toBe(12);
                expect(breakfast.bacon).toBe(2);
                expect(breakfast.drink).toBeUndefined();
    
                return done();
            });
    });

    /**
     * Tests that, when requesting a single breakfast with a nonexistant id, a 404 response is returned.
     */
    it('returns a 404 response when requesting with an invalid id', (done) => {

        request(app)
            .get('/breakfasts/00000000000000000000000F')
            .send()
            .expect(404, done); // We can pass the done function right away as a callback to expect(), if we don't have any further checks to make.

    });

});