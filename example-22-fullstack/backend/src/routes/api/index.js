import express from "express";

const router = express.Router();

import articles from "./articles.js";
router.use("/articles", articles);

import images from "./images.js";
router.use("/images", images);

export default router;
