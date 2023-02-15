import express from 'express';
import path from 'path';
import * as url from 'url';
import cors from 'cors';

// Setup Express
const app = express();
const port = process.env.PORT ?? 3000;

// CORS - enable all (not fantastic for security)
app.use(cors());

// Setup JSON parsing for request body
app.use(express.json());

// Setup our routes.
import routes from './routes';
app.use('/', routes);

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Make the "public" folder available statically
app.use(express.static(path.join(dirname, '../public')));

// Serve up the frontend's "dist" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(dirname, '../../frontend/dist')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(dirname, '../../frontend/dist/index.html'));
    });
}


// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, () => console.log(`App server listening on port ${port}!`));