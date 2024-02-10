import express from "express";

const router = express.Router();

import api from "./api/index.js";
router.use("/api", api);

export default router;
