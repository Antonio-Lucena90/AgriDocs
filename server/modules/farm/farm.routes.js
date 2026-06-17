import express from 'express';
import farmController from './farm.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/myFarms', verifyToken, farmController.getFarmsByUser);
router.post('/createFarm', verifyToken, farmController.createFarm);

export default router;