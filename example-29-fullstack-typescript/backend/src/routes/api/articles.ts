/**
 * This is a simple RESTful API for dealing with articles.
 */

import { ArticleSchema } from "common";
import express from "express";
import { z } from "zod";
import {
  createArticle,
  deleteArticle,
  retrieveArticle,
  retrieveArticleList,
  updateArticle
} from "../../data/articles-dao.js";

const router = express.Router();

// Create new article
router.post("/", async (req, res) => {
  // !!! TypeScript !!!
  // We use Zod to validate the request body against the ArticleSchema.
  // If you're not using Zod, you can either validate manually or cast the type to Article and pray the client doesn't send malformed data :)
  const payload = ArticleSchema.omit({ _id: true }).parse(req.body);

  const newArticle = await createArticle(payload);

  if (newArticle)
    return res.status(201).header("Location", `/api/articles/${newArticle._id}`).json(newArticle);

  return res.sendStatus(422);
});

// Retrieve all articles
router.get("/", async (_req, res) => {
  // You can put a '_' in front of any paramters you don't use to avoid TS warnings
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
  const id = z.string().parse(req.params.id);

  const article = await retrieveArticle(id);

  if (article) return res.json(article);
  return res.sendStatus(404);
});

// Update article
router.put("/:id", async (req, res) => {
  const id = z.string().parse(req.params.id);
  const article = ArticleSchema.omit({ _id: true }).parse(req.body);

  // !!! TypeScript !!!
  // Before, you might simply do `article._id = id;`
  // In TS, you can't modify the type of `article` directly because it doesn't have an `_id` field yet
  // Instead, you create a new object that includes the `_id` field
  const updatedArticle = { ...article, _id: id };

  const success = await updateArticle(updatedArticle);
  return res.sendStatus(success ? 204 : 404);
});

// Delete article
router.delete("/:id", async (req, res) => {
  const id = z.string().parse(req.params.id);
  await deleteArticle(id);
  return res.sendStatus(204);
});

export default router;
