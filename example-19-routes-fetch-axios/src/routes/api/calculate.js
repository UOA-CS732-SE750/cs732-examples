import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const result = parseInt(req.body.a) + parseInt(req.body.b);
  res.json({ result });
});

export default router;
