# CS732 examples - Lecture 04 - Example 24 - A full-stack application!
This project demonstrates how we can put all the moving parts together (MongoDB, Express, React, Node) to make a full MERN-stack application.

The [frontend](./frontend) of this app is almost identical to the starting point for Lab 03. The only difference is that we've changed a bunch of references to articles' `id` to `_id` instead (to match with the auto-generated MongoDB `_id` field). If you've completed Lab 03, you're welcome to (*carefully!*) copy the changes over to this example to gain their benefits.

The [backend](./backend) is where the majority of the changes lie. We've replaced the in-memory articles array with a persistent database (MongoDB). Specifically, the following changes have been implemented:

- A MongoDB / mongoose schema for articles has been defined, in [articles-data/schema.js](./backend/src/articles-data/schema.js).

- A console app, [init-db.js](./backend/src/articles-data/init-db.js) has been created. This is to be run independently of the Express server. Running this script will clear the database and populate it with freshly generated dummy data (from the `dummy-json` package).

- The `init-db` script can be run using the `init-db` npm script defined within [package.json](./backend/package.json) on line 10.

- [articles-dao.js](./backend/src/articles-data/articles-dao.js) has been updated so it interacts with MongoDB via mongoose, instead of a simple JavaScript array. Its functions have been changed to `async`, as all mongoose functions are `async`. This way, we can easily `await` them.

- [The REST service defined for articles](./backend/src/routes/api/articles.js) has been updated such that all its route handlers are now `async`. This allows us to effortlessly adapt to the new async articles DAO simply by `await`ing its functions.

- In the main [server.js](./backend/src/server.js) file, we've modified the server startup code. Now, we first connect to MongoDB, and then only start the server once the DB connection is established. We can see this code on line 33.
