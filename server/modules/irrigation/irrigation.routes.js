import express from 'express'; 
import irrigationController from './irrigation.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/:farm_id/irrigations', verifyToken, irrigationController.getIrrigationsByFarm);
router.post('/:farm_id/irrigationRecord', verifyToken, irrigationController.irrigationRecord); 


export default router; 