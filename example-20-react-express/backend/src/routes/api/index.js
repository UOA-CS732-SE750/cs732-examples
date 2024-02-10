import express from "express";

const router = express.Router();

import articles from "./articles.js";
router.use("/articles", articles);

export default router;
