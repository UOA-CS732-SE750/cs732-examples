# CS732 examples - Testing backend code (Express and mongoose)

This project continues on from the previous example by showing how we can test our Express routes and our code which interacts with a MongoDB database.

## Testing a MongoDB schema

[schema.test.js](./src/db/__tests__/schema.test.js) tests that the `Breakfast` schema defined in [schema.js](./src/db/schema.js) is correct. It does this by creating an running an in-memory MongoDB instance using the `mongodb-memory-server` package. We can see how this is created in the `beforeAll()` method on line 33, and shutdown in the `afterAll()` method on line 54. Additionally, clear the database and re-initialize it with dummy data before we run each test (line 43). Note that the code in `beforeEach()` doesn't use the `Breakfast` schema under test - it uses the native MongoDB functions for adding / clearing data.

## Testing an Express server

[breakfast.test.js](./src/routes/__tests__/breakfast.test.js) tests the Express routes defined in [breakfast.js](./src/routes/breakfast.js). Like the `schema.test.js` tests above, we also create an in-memory MongoDB instance. This time, we also create an Express server, and configure it with the routes we're trying to test (line 10). We then use the [`supertest` package](https://www.npmjs.com/package/supertest) to make requests. Supertest will take care of starting and stopping the Express server as needed, and will manage ports, etc. for us. The tests themselves examine whether the Express routes correctly serve up the data contained within the database as expected.
