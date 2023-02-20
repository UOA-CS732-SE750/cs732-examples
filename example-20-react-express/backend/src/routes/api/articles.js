/**
 * This is a simple RESTful API for dealing with articles.
 */

import express from 'express';
import {
    createArticle,
    retrieveArticle,
    retrieveArticleList,
    updateArticle,
    deleteArticle
} from '../../articles-dao';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create new article
router.post('/', (req, res) => {
    const { title, image, content } = req.body;
    const newArticle = createArticle({ title, image, content });

    res.status(HTTP_CREATED)
        .header('Location', `/api/articles/${newArticle.id}`)
        .json(newArticle);
})

// Retrieve all articles
router.get('/', (req, res) => {

    // Uncomment the following code to introduce an artificial delay before the response
    // is sent back to the client.
    setTimeout(() => {
        res.json(retrieveArticleList());
    }, 2000);


    // When introducing the artificial delay, also comment this line. It's an error to send
    // two responses.
    // res.json(retrieveArticleList());
});

// Retrieve single article
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const article = retrieveArticle(id);

    if (article) {
        res.json(article);
    }
    else {
        res.status(HTTP_NOT_FOUND).end();
    }
});

// Update article
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const article = req.body;

    article.id = id;

    const success = updateArticle(article);

    if (success) {
        res.status(HTTP_NO_CONTENT).end();
    }
    else {
        res.status(HTTP_NOT_FOUND).end();
    }
});

// Delete article
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteArticle(id);
    res.status(HTTP_NO_CONTENT).end();
});

export default router;