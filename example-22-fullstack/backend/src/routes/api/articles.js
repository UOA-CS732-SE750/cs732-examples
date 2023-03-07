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
} from '../../articles-data/articles-dao';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create new article
router.post('/', async (req, res) => {
    const newArticle = await createArticle(req.body);

    if (newArticle) return res.status(HTTP_CREATED)
        .header('Location', `/api/articles/${newArticle._id}`)
        .json(newArticle);

    return res.sendStatus(422);
})

// Retrieve all articles
router.get('/', async (req, res) => {

    // Uncomment the following code to introduce an artificial delay before the response
    // is sent back to the client.
    // setTimeout(() => {
    //     res.json(retrieveArticleList());
    // }, 2000);


    // When introducing the artificial delay, also comment this line. It's an error to send
    // two responses.
    res.json(await retrieveArticleList());
});

// Retrieve single article
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const article = await retrieveArticle(id);

    if (article) return res.json(article);
    return res.sendStatus(HTTP_NOT_FOUND);
});

// Update article
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const article = req.body;
    article._id = id;
    const success = await updateArticle(article);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

// Delete article
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteArticle(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;