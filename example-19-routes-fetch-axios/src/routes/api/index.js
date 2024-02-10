import express from "express";

const router = express.Router();

import calculate from "./calculate.js";
router.use("/calculate", calculate);

import greeting from "./greeting.js";
router.use("/greeting", greeting);

export default router;
