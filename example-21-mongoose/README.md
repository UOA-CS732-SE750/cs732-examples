# CS732 examples - MongoDB and Mongoose
This project demonstrates how we can use the `mongoose` npm package to interact with a MongoDB database.

- We define a schema in [schema.js](./src/schema.js). The defined schema is for a pet registration app. There are users with several fields such as `username`, `firstName`, `dateOfBirth`, etc. Each user can have any number of registered pets. The schema JS file is extensively commented, for your reference.

- The main program is [app.js](./src/app.js). The program demonstrates how we can add, clear, and query information in the database.

- On `app.js` line 14, we connect do the database. The connection string is set for a database running on the same machine as this app. If you'd like to change it to, for example, a cloud-based database, you're welcome to do so by changing this connection string.

- After running the app, you can open the created database in a tool such as [MongoDB Compass](https://www.mongodb.com/products/compass) to see the all of the data that's been added.
