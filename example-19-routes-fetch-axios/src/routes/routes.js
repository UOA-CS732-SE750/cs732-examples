import express from "express";

const router = express.Router();

import apiRoutes from "./api/index.js";
router.use("/api", apiRoutes);

export default router;
