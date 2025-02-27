# CS732 Examples - Intro to Node.js / Express

This example shows a basic Node.js / Express server with some simple configuration. We can see the examples detailed below.

Remember to `npm install` to install your application's dependencies prior to running.

## Testing your routes

### In the browser

When testing your routes, some of this can be done using your browser. For example, by running the Express server in this example and then browsing to <http://localhost:3000/>, you should see the following JSON appear in your browser:

```json
{
  "message": "Hello, world!"
}
```

**Tip**: If you end up looking at a lot of JSON in your browser, it might pay to install a JSON formatter browser extension like [this one for Chrome-based browsers](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa), to make the experience nicer on yourself.

### With a tool

When you navigate to a route in your browser, it sends a `GET` request to that route. If you're trying to test anything other than `GET` requests, you'll need to use a tool. [Postman](https://www.postman.com/downloads/) is an industry-standard tool which we demonsrate in the lecture content. You can streamline your dev experience even further by using the [Postman extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode).

## Provided examples

- **Running the app:** This example, along with all other Node.js / Express examples, labs, and tests, is setup with a couple of different `npm` commands:

  - `npm run start` or just `npm start` will start the Node.js Express server running. However, if you want to make any changes to your code, you will need to _stop_ the server and manually restart it.

  - `npm run dev` will also start your server, but will also listen for any changes to the code. If you make changes to the code, _nodemon_ will automatically stop the server and restart it. In this way, you get a dev experience similar to your Svelte development, where you don't have to continually manually restart / redeploy things. This is useful for development.

- **Reading environment variables**: On [`app.js`](./src/app.js) line 9, we are using the `dotenv` package to read in and configure our sever with any _environment variables_ we have defined in the [`.env`](./.env) file. In our case, we have one variable defined there - `PORT=3000`.

  We are using this environment variable on line 25 (`process.env` will contain all our environment variables as properties) - and are also supplying `3000` as a default value in case no environment variable is defined.

  It is usually considered good practice to define things such as ports, base URLs, API keys, and database connection strings as environment variables. That way, we can change them without having to edit our JavaScript code, and we can even easily exclude them from version control if they contain private information.

- **Server setup**: In `app.js`, we can see a basic Express setup, including:

  - Creating the server (line 28)
  - Adding logging using the [morgan](https://www.npmjs.com/package/morgan) package (line 36)
  - Adding CORS support using the [cors](https://www.npmjs.com/package/cors) package (line 49)
  - Adding JSON support to the HTTP request body processing (line 57)
  - Allowing files to be served directly from the "public" directory (line 66)
  - Starting the server (line 135)

  In future examples and labs, we may add additional features to the startup script, such as initializing databases.

- **Route handlers**: On lines 73, 86, and 105, we have three _route handlers_ defined. Our `express` object has functions which respond to HTTP methods of certain types. For example, the `get()` function which we are using in these three route handlers will respond to `GET` requests. We have another route handler on line 125 which responsds to a `POST` request. Other examples we will see in the future will also include `put()`, `patch()`, and `delete()`.

  For each route handler, the first argument is the _path_ to match. These four handlers will respond to `GET` requests to paths `/`, `/api/people`, and `/api/people/:id`, and `POST` requests to `/api/people`, respectively (where `:id` is a _route parameter_ - see below).

  The second argument is a function which takes two parameters. The first parameter, `req`, contains information about the request, including any data which was supplied to the server by the client. The second parameter, `res`, contains functions which we can use to send data back to the client.

- **Sending JSON data**: We can see that each of our three route handlers return JSON data to the client. We can do this using the `res.json()` function, which accepts any object as an argument. The function will automatically stringify that object, and return it as a JSON string, along with the status code `200` (OK) and the `Content-Type` header set to `application/json` to let the client know that the request was successful and that the response is formatted as JSON.

- **Receiving query parameters**: Our route handler on line 86 accesses the request object's `req.query` property to read various _query parameters_ (`firstName`, in this case).

  As a refresher, the _query string_ of a URL is the bit after the `?`. For example, for the URL `http://localhost:3000/foo?name=Andrew&likes=Pokemon`, the query string is `name=Andrew&likes=Pokemon`.

  Then, each query _parameter_ is one of the key-value pairs (separated by `&`). For example, in the query string above, there are two parameters (`name` and `likes`), with the values `Andrew` and `Pokemon`, respectively. These values would be accessible from our code as `req.query.name` and `req.query.likes`.

  If we try to access a query param that the user did not supply in the URL, then its value would be `undefined`. Query parameters are usually considered optional, so we should always make sure our code gracefully handles any missing query parameters. In our route handler here, we have a default behaviour (returning the entire `people` array) if the `firstName` query param is not defined.

- **Route parameters**: Just like Svelte on the frontend, we can also use route parameters on our backend. However, the way we do it is different. Instead of organizing our code into folders, we instead need to read the route parameters using the `req.params` property. We define a route parameter in the path by using `:` followed by the parameter name (for example, `:id`), then we access it using the same name, e.g. `req.params.id`. We can see an example of this in our route handler on line 105.

- **Returning status codes**: Sometimes, we don't want to return JSON - we might want to return a status code to indicate that something unexpected happened - or, we might want to return JSON **and** a different status code (`res.json()` will return a `200` status by default, but we can change that).

  If we just want to return a blank response with a particular status code, we can do so using `res.sendStatus()`. We can see an example on line 116 where we're returning a `404` status code (which means "Not Found"), if we try to access a person with an unknown id.

  If we want to return JSON _and_ a non-200 status code, we can use the response object's `status()` function to modify the status code before calling `json()`. For example:

  ```js
  const newPerson = { firstName: "Bob", lastName: "Marley" };
  return res.status(201).json(newPerson);
  ```

  This code above will return the `newPerson` as JSON, but will send the status code `201` (which means "Created") instead of the default `200`. We can see an example on line 128, where we are doing the above, in addition to setting the Location header so the client knows where it can browse to get to the newly created person.

- **Data access**: In our two route handlers dealing with people information, we can see that we are calling functions which are defined in [`data/people-dao.js`](./src/data/people-dao.js). We have _abstracted_ away the logic of accessing our data from the route handlers - good _separation of concerns_. This will make it easier to change the underlying data structure later on (for example, switching to an SQL database rather than a simple array), without having to modify our route handlers too much.

  Doing this also makes our route handlers easier to read. For example, it's quite obvious what this line does at a glance, because of the helpfully-named data access function:

  ```js
  res.json(retrievePeopleByFirstName(firstName));
  ```

  Whereas, it may be more difficult to understand if it were written like so:

  ```js
  res.json(people.filter((p) => p.firstName === firstName));
  ```
