import express from 'express';

const router = express.Router();

import articles from './articles';
router.use('/articles', articles);

export default router;