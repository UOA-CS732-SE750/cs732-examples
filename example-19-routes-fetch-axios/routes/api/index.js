import express from 'express';

const router = express.Router();

import calculate from './calculate';
router.use('/calculate', calculate);

import greeting from './greeting';
router.use('/greeting', greeting);

export default router;