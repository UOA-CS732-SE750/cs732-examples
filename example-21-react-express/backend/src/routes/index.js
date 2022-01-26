import express from 'express';

const router = express.Router();

import api from './api';
router.use('/api', api);

export default router;