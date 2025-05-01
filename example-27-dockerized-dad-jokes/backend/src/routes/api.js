import express from "express";
const router = express.Router();

import dadJokesRoutes from "./api-dad-jokes.js";
router.use("/dad-jokes", dadJokesRoutes);

export default router;