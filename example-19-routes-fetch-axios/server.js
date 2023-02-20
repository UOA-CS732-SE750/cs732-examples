import express from 'express';
import path from 'path';
import * as url from 'url';

// Setup Express
const app = express();
const port = process.env.PORT || 3000;

// Setup JSON parsing for request body
app.use(express.json());

// Setup our routes.
import routes from './routes';
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(url.fileURLToPath(new URL('.', import.meta.url)), 'public')));

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, () => console.log(`App server listening on port ${port}!`));