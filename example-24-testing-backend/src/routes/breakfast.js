import express from 'express';
import Breakfast from '../db/schema';

const router = express.Router();

router.get('/breakfasts', async (req, res) => {
    const breakfasts = await Breakfast.find();
    res.json(breakfasts);
});

router.get('/breakfasts/:id', async (req, res) => {

    const breakfast = await Breakfast.findById(req.params.id);

    if (breakfast) {
        res.json(breakfast);
    }

    else {
        res.sendStatus(404);
    }
});

export default router;