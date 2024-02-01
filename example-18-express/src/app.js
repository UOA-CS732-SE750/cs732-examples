/**
 * This program is a basic Node.js / Express server which shows off a few different key concepts.
 */

/**
 * These two lines allow us to read environment variables from .env files. This way we can configure
 * our PORT without editing our JavaScript code. This is good practice.
 */
import dotenv from "dotenv";
dotenv.config();

// Imports which we will use
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Some data access functions to retrieve people.
import {
  retrievePeople,
  retrievePeopleByFirstName,
  retrievePersonById,
  createPerson
} from "./data/people-dao.js";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

/**
 * Adds some default console logging to our app. This will configure the morgan middleware in a really basic manner.
 * For more advanced configuration options,
 * 
 * @see https://www.npmjs.com/package/morgan
 */
app.use(morgan('combined'));

/**
 * app.use() allows us to add Middleware to our Express applications. Essentially, middleware will
 * be able to look at any incoming requests and modify various behaviour or add additional functionality
 * based on those requests and which middlewares we use.
 *
 * the cors() middleware, from the "cors" package, will add CORS support to our application. The default
 * configuration shows here will allow CORS from any host; in practice, we might want to limit this to only
 * sites we want to allow.
 *
 * @see https://www.npmjs.com/package/cors
 */
app.use(cors());

/**
 * Here's another middleware we're adding - express.json(). This middleware will allow Express to inspect
 * any incoming HTTP request and, if its Content-Type is JSON, will automatically parse that JSON into
 * a JavaScript object (using JSON.parse()) and add it to the "req.body" property of that request for us
 * to access later. We will see this in action in future examples.
 */
app.use(express.json());

/**
 * One more middleware - express.static(). This one will make all files in the given directory ("public",
 * in this case) available to be served up directly.
 *
 * For example, if we are running on localhost:3000, then browsing to http://localhost:3000/Dragonite.png
 * will serve up the file Dragonite.png, located in the "public" folder.
 */
app.use(express.static("public"));

/**
 * This route handler will respond to a GET request to the "/" path (e.g. http://localhost:3000/). It will
 * return an HTTP 200 (OK) response with the given JSON data.
 */
app.get("/", (req, res) => {
  /**
   * res.json() will return a 200 OK response, with Content-Type = application/json, and a JSON string equal
   * to the result of calling JSON.stringify() on the given JavaScript object.
   */
  return res.json({ message: "Hello, world!" });
});

/**
 * This route handler will respond to a GET request to "/api/people" (e.g. http://localhost:3000/api/people).
 * It wil return a JSON array of all people by default. Or, if the "firstName" query parameter is supplied,
 * it will instead return an array of only those people whose firstName matches the query.
 */
app.get("/api/people", (req, res) => {
  /**
   * Read the firstName query parameter. If the URL was ..../api/people?firstName=Alice, then
   * this firstName variable would equal "Alice". If the firstName query parameter is not supplied, this
   * will be undefined.
   */
  const firstName = req.query.firstName;

  // If there's no query parameter supplied, just return an array of all people.
  if (!firstName) return res.json(retrievePeople());

  // If the firstName query parameter is supplied, instead return an array of all people whose first names match the filter.
  return res.json(retrievePeopleByFirstName(firstName));
});

/**
 * This route handler will respond to a GET request to "/api/people/:id", where :id is the id of a person.
 * If that person exists, it will be returned as JSON. Otherwise, a 404 (Not Found) error code will be returned.
 */
app.get("/api/people/:id", (req, res) => {
  // req.params contains all route parameters. Here, we're getting the value of the id param.
  const id = req.params.id;

  // Find the person with the matching id
  const person = retrievePersonById(id);

  // If there is a match, return that person as JSON
  if (person) return res.header("My-Header", "myValue").json(person);

  // Otherwise, return a 404 (Not Found) error code
  return res.sendStatus(404);
});

/**
 * This route handler will respond to a POST request to "/api/people". It will add a new
 * person to the "database", based on the info contained in the request body. It will return a
 * 201 (Created) status code, along with the URL location of the new person, and a JSON
 * representation of that person.
 */
app.post("/api/people", (req, res) => {
  const newPerson = createPerson(req.body.firstName, req.body.lastName, req.body.email);

  return res.status(201).location(`/api/people/${newPerson.id}`).json(newPerson);
});

/**
 * Starts the Express server running on the given port. Once up and running, the given function will be called,
 * which in this case will log the below message to the console to let you know that the server has started
 * successfully.
 */
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
