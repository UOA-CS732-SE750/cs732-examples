import express from 'express';
import Breakfast from '../db/schema';

const router = express.Router();

router.get('/breakfasts', async (req, res) => {
    const breakfasts = await Breakfast.find();
    res.json(breakfasts);
});

router.get('/breakfasts/:id', async (req, res) => {
    res.json(await Breakfast.findById(req.params.id));
});

export default router;