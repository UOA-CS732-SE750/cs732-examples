# CS732 examples - Lecture 03 - Example 20 - Organizing routes, `fetch()`, and `axios`
In this example, we can see one method for organizing our Express routes, using Express router. We also see basic examples of how we can consume APIs using `fetch()` and `axios`. This example doesn't contain any React code - we'll see how we can integrate with React in the next example.


## Organizing routes with Express router
In our main backend JavaScript file ([server.js](./server.js)), we can see that on lines 13 and 14, we're importing and using `routes`, mapped to the path `/`. We're importing this from `/routes`.

You'll notice that `/routes` is a *folder*, not a file. If we try to import a folder, JavaScript will actually import a file named `index.js` inside of that folder - i.e. [/routes/index.js](./routes/index.js) in this case.

Inside `/routes/index.js`, we're creating an Express router on line 3. We're adding more routes to it, imported from `/api`, on lines 5 and 6. We're mapping this to the path `/api`.

`/api` is again a folder, so the import refers to the file [/routes/api/index.js](./routes/api/index.js). We're adding further routes from [calculate.js](./routes/api/calculate.js) and [greeting.js](./routes/api/greeting.js), under the `/calculate` and `/greeting` paths, respsectively.

To figure out the URL path that corresponds to one of the route handlers (endpoints) defined in `greeting.js` and `calculate.js`, we take into account the path specified in the handler itself, prepended with the paths specified in the routers leading up to that path.

For example, we're defining a route handler on line 5 of [calculate.js](./routes/api/calculate.js):

- Its own path is `/`

- That router is used from within [api/index.js](./routes/api/index.js), under the path `/calculate` (line 6)

- ...which is in turn used from within [/routes/index.js](./routes/index.js) under the path `/api` (line 6)

- ...which is in turn used from [server.js](./server.js) under the path `/` (line 13).

Therefore, the URL path to match that route is `/api/calculate` (ignore the `/` entries).

**Note:** You *don't* have to organize your routes this way. Mapping your file / folder structure to your API endpoint structure is just one possibility. You can organize your routes however makes sense to you / your project.


## fetch()
`fetch()` is the modern standard JavaScript way of making HTTP requests and retrieving responses. It is supported by all modern browsers and many node.js distributions.

For an example of how we can send a `GET` request using `fetch()`, see [public/index.js](./public/index.js), line 12. Note thet `fetch()` returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). In the example code we're handling the result with `.then()`. You could also use [async / await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) if desired.

For an example of how to send non-`GET` requests, and / or requests which require us to send data to the server, see line 20 of the same file. Note the extra configuration options required.


## axios
`axios` is a package originally designed to ensure consistency in our HTTP code between frontends and backends. If we're developing a simple HTML page frontend, we can use the following script to import it:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Or, if we're using an `npm`-based project (e.g. create-react-app projects, Express servers) we can use:

```sh
npm install --save axios
```

The file [index-axios.js](./public/index-axios.js) demonstrates how we can use axios to send requests to the server. The API is promise-based, as it is with fetch. However, the default configuration of the methods is simpler, especially with non-`GET` requests, requests that send data to the server, and / or requests that receive JSON data from the server.

For more information, see the [axios GitHub page](https://github.com/axios/axios#example).