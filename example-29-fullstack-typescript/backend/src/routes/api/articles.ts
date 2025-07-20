/**
 * This is a simple RESTful API for dealing with articles.
 */

import express from "express";
import {
  createArticle,
  retrieveArticle,
  retrieveArticleList,
  updateArticle,
  deleteArticle,
} from "../../data/articles-dao.js";

const router = express.Router();

// Create new article
router.post("/", async (req, res) => {
  const newArticle = await createArticle(req.body);

  if (newArticle)
    return res
      .status(201)
      .header("Location", `/api/articles/${newArticle._id}`)
      .json(newArticle);

  return res.sendStatus(422);
});

// Retrieve all articles
router.get("/", async (_req, res) => { // You can put a '_' in front of any paramters you don't use to avoid TS warnings
  // Uncomment the following code to introduce an artificial delay before the response
  // is sent back to the client.
  // setTimeout(async () => {
  //     return res.json(await retrieveArticleList());
  // }, 2000);

  // When introducing the artificial delay, also comment this line. It's an error to send
  // two responses.
  return res.json(await retrieveArticleList());
});

// Retrieve single article
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const article = await retrieveArticle(id);

  if (article) return res.json(article);
  return res.sendStatus(404);
});

// Update article
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const article = req.body;
  article._id = id;
  const success = await updateArticle(article);
  return res.sendStatus(success ? 204 : 404);
});

// Delete article
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteArticle(id);
  return res.sendStatus(204);
});

export default router;
