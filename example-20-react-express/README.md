# CS732 examples - React + Express integration; Consuming APIs from React code

This project contains the following:

- An example project structure with frontend and backend elements. The frontend is written with Vite+React, while the backend is written with Node.js + Express.

- On the backend, an example of how to conditionally serve up the production version of the frontend, when running in production mode.

- A demonstration of a REST CRUD API written using Express

- A demonstration of how to appropriately call our API from a React app

## Example project structure

The project demonstrates a project structure that can work well for Vite + Express apps. We have a [backend](./backend) folder containing the Express server, and a [frontend](./frontend) folder containing our React app. Each maintains their own `package.json` and `node_modules` folders.

_Note_: There are other possible project structures - this is just one possibility.

## Environment variables

When making web requests from our frontend - such as when we consume our own Express API - we need so specify the URL to which that request should be sent. Often, this URL could be different depending on various conditions. For instance, in this example, we have two variations. When running in development mode, our backend is served from <http://localhost:3000>, but our frontend is served from our Vite dev server (usually <http://localhost:5173>). Therefore we explicitly need to point our frontend's API requests to <http://localhost:3000>. However, when we build for production, we might want to deploy the frontend and backend to different locations - or the _same_ location - in the cloud (currently the project is setup such that the backend serves the production-ready frontend itself - see below). And, we want to be able to change these configurations easily.

One way we can set this up is to use _environment variables_. Vite [supports environment variables using various `.env` files](https://vitejs.dev/guide/env-and-mode.html). In our example, in our [frontend](./frontend), we have two files: `.env` and `.env.production`. The contents of `.env` will apply by default, and will be overridden in production by the more specific `.env.production` file.

Note that our environment variables start with `VITE_`. As mentioned in [this link](https://vitejs.dev/guide/env-and-mode.html), Vite requires this in order to prevent accidental leakage of env variables into the client code.

Once we've added environment variables, we can access them from our code using `import.meta.env.*`, where `*` is our env variable name. For example, the value of our `VITE_IMAGE_BASE_URL` variable can be obtained with `import.meta.env.VITE_IMAGE_BASE_URL`. This can be seen in [GalleryPage.jsx](./frontend/src/GalleryPage.jsx) and [ArticleView.jsx](./frontend/src/ArticleView.jsx).

## Building the frontend for production, and serving it from the backend

When building an app with Vite, one of the `npm` commands given is `npm build`. This will create a `dist` directory in the project folder, and will write an optimized version of your React app to it, which no longer depends on Vite or any other build / development tools. We can simply serve the contents of this `dist` directory from our Express server (or any other backend).

We can see an example of this in our backend, [app.js](./backend/src/app.js). On line 25, we're setting up two additional Express routes:

- The first will expose the frontend's `dist` folder publicly

- The second will serve up `index.html` (in the dist folder) when it receives any GET request that couldn't be processed by any of the server's routes.

These two rules are enough to serve the production version of our React code, on the same server as the Express app itself. We're only enabling these two rules if the `NODE_ENV` environment variable is set to `production`. A new `prod` `npm` command has been created in [backend/package.json](./backend/package.json) which runs the app with this environment variable set. **Note** the different use of environment variables from the node.js backend - we use `process.env.*` instead of `import.meta.env.*`.

## A REST CRUD API in Express

In our backend code, we've build a simple REST API to interact with a set of articles. The API routes are defined in [articles.js](./backend/src/routes/api/articles.js). The following routes are defined:

- Creating a new article (line 22)

- Retrieving a list of articles (line 33)

- Retrieving a single article, by id (line 46)

- Updating an article (line 57)

- Deleting an article (line 71)

The API is setup to use appropriate HTTP methods, URLs, and response status codes for each of the operations.

**Note:** The API's "retreive list" route (line 33) is written to introduce an artifical 2000ms delay. This can be useful for testing how your UI will look while waiting for data to be fetched, but can be disabled by following the instructions in the comments.

## Consuming an API from React

In our frontend's [useGet.js](./frontend/src/useGet.js) file, we have created a custom hook for fetching data from a given URL, using axios. This is done by maintaining a stateful value, and a side-effect which performs the actual fetch operation. Currently the hook supports:

- Dynamic URL: If the URL changes, the data will be re-fetched (due to the new `url` causing a mismatch in the array passed to `useEffect()`).

- Loading status: While the fetch is in-progress, the `isLoading` stateful value will be set to `true`. It will be `false` at other times. This value can be used to, for example, conditionally render a "Loading" bar, as can be seen in [App.jsx](./frontend/src/App.jsx) line 42.

You'll be extending this hook to provide additional functionality in one of the course labs!
