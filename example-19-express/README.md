# CS732 examples - Lecture 03 - Example 19 - Node.js and Express
This project contains a simple node.js / Express server application.

The main code is located in [server.js](./server.js). The key parts of the file are as follows:

- Line 6 creates an Express server instance, which we'll configure before starting.

- Line 15 defines a *route handler* function. When a `GET` request (determined by the method name, `get()`) is made to a URL matching the given path (`/hello` in this case), the given route handler function will be called to generate the response. It takes (at least) two args: `req` contains information about the request that was sent, while `res` allows us to send a response back. In this case, we can see that we're sending some HTML back to the user, with the content type `text/html` and status code `200` ("OK"). This also shows that we can use method chaining to chain arbitrary methods together on the response. Each method returns the response object itself.

- Line 32 defines another route handler. In this case, we're sending a JS object back in the response, formatted as JSON. Internally, the response object's `json()` function calls `JSON.stringify()` on the given object, then sends the string back with a `200` response code and an `application/json` content type. We can also see here how we're accessing the query string of the request URL, by using `req.query`. Each query parameter (in this case, `name`), is accessible as a property of `req.query`. For example, in this case, if the user navigated to <http://localhost:3000/api?name=Chelsea>, then the response would be the following JSON:

```json
{
    "greeting": "Hello, world!",
    "name": "Chelsea"
}
```

- Line 40 serves up the `public` folder. Any file within that folder (including nested folders) can be accessed directly with an appropriate URL. For example, <http://localhost:3000/index.html> will serve up the file `index.html` located in the `public` folder (note that we don't include "public" as part of the URL). In addition, the file `index.html` itself is a *special case* - if we simply browse to the root (<http://localhost:3000/>), this file will automatically be served.

- Line 45 starts the server running on the given port. The given function will be called once the server has properly been started.

In addition to the code in `server.js`, we can also see that [index.html](./public/index.html) contains links to the routes defined within, to allow us to easily test.
