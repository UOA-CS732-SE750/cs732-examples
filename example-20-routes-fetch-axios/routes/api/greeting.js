import { v4 as uuid } from 'uuid';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {

    res.json({ message: `Hello, world! Unique ID: ${uuid()}` });

});

export default router;