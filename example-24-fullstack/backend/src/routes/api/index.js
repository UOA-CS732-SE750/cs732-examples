import express from 'express';

const router = express.Router();

import articles from './articles';
router.use('/articles', articles);

import images from './images';
router.use('/images', images);

export default router;