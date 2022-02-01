# CS732 examples - Lecture 03 - Example 21 - React + Express integration; Consuming APIs from React code
This project contains the following:

- An example project structure with frontend and backend elements. The frontend is written with create-react-app, while the backend is written with Node.js + Express.

- On the frontend, a proxy is configured to allow the frontend React code to communicate with the Express development server running separately.

- On the backend, an example of how to conditionally serve up the production version of the frontend, when running in production mode.

- A demonstration of a REST CRUD API written using Express

- A demonstration of how to appropriately call our API from a React app


## Example project structure
The project demonstrates a project structure that can work well for CRA + Express apps. We have a [backend](./backend) folder containing the Express server, and a [frontend](./frontend) folder containing our React app. Each maintains their own `package.json` and `node_modules` folders.


## Proxying a server in create-react-app
When using a CRA project in development mode, we need to run the Webpack server to enable dynamic serving of content to the browser, and to enable hot reloading and other debug / development-friendly features. This is what runs on `localhost:3000` when we `npm start`.

If we *also* want to run our own server (whether that be Express or another backend of your choice), then the easiest way is to run the server on a separate port. However, we would often want to write our React frontend as if the APIs it is consuming are hosted on the same server / port as where the React app itself is served.

To do this, we can set the `proxy` property of the frontend's package file We can see an example in [frontend/package.json](./frontend/package.json). Any HTTP requests received by the Webpack server will be instead served by the configured proxy, so long as those requests don't include the `accept: text/html` header and the Webpack server can't directly serve them itself.

This way, we can write all our `fetch()` / `axios` calls in our React app as though they're requesting from the same host / port as the React app itself, as this will often be the case during production (see below).


## Building the frontend for production, and serving it from the backend
When building an app with create-react-app, one of the `npm` commands given is `npm build`. This will create a `build` directory in the project folder, and will write an optimized version of your React app to it, which no longer depends on Webpack or any other build / development tools. We can simply serve the contents of this build directory from our Express server (or any other backend).

We can see an example of this in our backend in this project, [server.js](./backend/src/server.js). On line 20, we're setting up two additional Express routes:

- The first will expose the frontend's `build` folder publicly

- The second will serve up `index.html` (in the build folder) when it receives any GET request that couldn't be processed by any of the server's routes.

These two rules are enough to serve the production version of our React code, on the same server as the Express app itself. We're only enabling these two rules if the `NODE_ENV` environment variable is set to `production`. A new `production` `npm` command has been created in [backend/package.json](./backend/package.json) which runs the app with this environment variable set.


## A REST CRUD API in Express
In our backend code, we've build a simple REST API to interact with a set of articles. The API routes are defined in [articles.js](./backend/src/routes/api/articles.js). The following routes are defined:

- Creating a new article (line 22)

- Retrieving a list of articles (line 32)

- Retrieving a single article, by id (line 47)

- Updating an article (line 61)

- Deleting an article (line 78)

The API is setup to use appropriate HTTP methods, URLs, and response status codes for each of the operations.

**Note:** The API's "retreive list" route (line 32) is written to introduce an artifical 2000ms delay. This can be useful for testing how your UI will look while waiting for data to be fetched, but can be disabled by following the instructions in the comments.


## Consuming an API from React
In our frontend's [useGet.js](./frontend/src/useGet.js) file, we have created a custom hook for fetching data from a given URL, using axios. This is done by maintaining a stateful value, and a side-effect which performs the actual fetch operation. Currently the hook supports:

- Dynamic URL: If the URL changes, the data will be re-fetched (due to the new `url` causing a mismatch in the array passed to `useEffect()`).

- Loading status: While the fetch is in-progress, the `isLoading` stateful value will be set to `true`. It will be `false` at other times. This value can be used to, for example, conditionally render a "Loading" bar, as can be seen in [App.js](./frontend/src/App.js) line 45.

You'll be extending this hook to provide additional functionality in Week Three's lab :)