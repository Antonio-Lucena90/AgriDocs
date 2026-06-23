import express from 'express';
import fertilizedController from './fertilized.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/:farm_id/fertilizations', verifyToken, fertilizedController.getFertilizationsByFarm);
router.post('/:farm_id/createFertilization', verifyToken, fertilizedController.createFertilization);

export default router;
