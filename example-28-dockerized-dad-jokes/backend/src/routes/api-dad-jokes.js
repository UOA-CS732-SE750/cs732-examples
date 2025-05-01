import express from "express";
const router = express.Router();
import { DadJoke } from "../data/schema.js";

router.get("/", async (req, res) => {
  const jokes = await DadJoke.find({});
  return res.json(jokes);
});

router.post("/", async (req, res) => {
  const newJoke = req.body.text;
  console.log(newJoke);
  if (!newJoke || typeof newJoke !== "string" || newJoke.length === 0)
    return res.status(422).send("joke must be a string with length > 0");

  const joke = new DadJoke({
    text: newJoke
  });
  await joke.save();
  return res.status(201).location(`/api/dad-jokes/${joke._id}`).json(joke);
});

router.get("/random", async (req, res) => {
  const joke = await DadJoke.aggregate([{ $sample: { size: 1 } }]);
  if (joke.length === 0) return res.status(404).send("No jokes found");

  return res.json(joke[0]);
});

router.get("/:id", async (req, res) => {
  const joke = await DadJoke.findById(req.params.id);
  if (!joke) return res.status(404).send("joke not found");

  return res.json(joke);
});

router.delete("/:id", async (req, res) => {
  await DadJoke.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
});

export default router;
