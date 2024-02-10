# CS732 examples - Organizing routes, `fetch()`, and `axios`

In this example, we can see one method for organizing our Express routes, using Express router. We also see basic examples of how we can consume APIs using `fetch()` and `axios`. This example doesn't contain any React code - we'll see how we can integrate with React in the next example.

## Organizing routes with Express router

In our main backend JavaScript file ([app.js](./src/app.js)), we can see that on lines 26 and 27, we're importing and using `routes`, mapped to the path `/`. We're importing this from `/routes/routes.js`.

Inside [`/routes/routes.js`](./src/routes/routes.js), we're creating an Express router on line 3. We're adding more routes to it, imported from `./api/index.js`, on lines 5 and 6. We're mapping this to the path `/api`.

In that file ([/routes/api/index.js](./src/routes/api/index.js)), we're adding further routes from [calculate.js](./src/routes/api/calculate.js) and [greeting.js](./src/routes/api/greeting.js), under the `/calculate` and `/greeting` paths, respsectively.

To figure out the URL path that corresponds to one of the route handlers (endpoints) defined in `greeting.js` and `calculate.js`, we take into account the path specified in the handler itself, prepended with the paths specified in the routers leading up to that path.

For example, we're defining a route handler on line 5 of [calculate.js](./src/routes/api/calculate.js):

- Its own path is `/`

- That router is used from within [api/index.js](./src/routes/api/index.js), under the path `/calculate`

- ...which is in turn used from within [/routes/routes.js](./src/routes/routes.js) under the path `/api`

- ...which is in turn used from [app.js](./src/app.js) under the path `/`.

Therefore, the URL path to match that route is `/api/calculate` (ignore the `/` entries).

**Note:** You _don't_ have to organize your routes this way. Mapping your file / folder structure to your API endpoint structure is just one possibility. You can organize your routes however makes sense to you / your project.

## fetch()

`fetch()` is the modern standard JavaScript way of making HTTP requests and retrieving responses. It is supported by all modern browsers and many node.js distributions.

For an example of how we can send a `GET` request using `fetch()`, see [public/index.js](./public/index.js), line 9. Note thet `fetch()` returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). In the example code we're handling the result with `.then()`. You could also use [async / await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) if desired.

For an example of how to send non-`GET` requests, and / or requests which require us to send data to the server, see line 15 of the same file. Note the extra configuration options required.

## axios

`axios` is a package originally designed to ensure consistency in our HTTP code between frontends and backends. If we're developing a simple HTML page frontend, we can use the following script to import it:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Or, if we're using an `npm`-based project (e.g. Vite+React projects, Express servers) we can use:

```sh
npm install axios
```

The file [index-axios.js](./public/index-axios.js) demonstrates how we can use axios to send requests to the server. The API is promise-based, as it is with fetch. However, the default configuration of the methods is simpler, especially with non-`GET` requests, requests that send data to the server, and / or requests that receive JSON data from the server.

For more information, see the [axios GitHub page](https://github.com/axios/axios#example).
