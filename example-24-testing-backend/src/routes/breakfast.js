import express from "express";
import Breakfast from "../db/schema";

const router = express.Router();

router.get("/breakfasts", async (req, res) => {
  const breakfasts = await Breakfast.find();
  return res.json(breakfasts);
});

router.get("/breakfasts/:id", async (req, res) => {
  const breakfast = await Breakfast.findById(req.params.id);

  if (breakfast) return res.json(breakfast);
  return res.sendStatus(404);
});

export default router;
