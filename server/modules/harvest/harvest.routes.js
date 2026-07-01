import express from 'express';
import HarvestController from './harvest.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/:zone_id/createHarvest', verifyToken, HarvestController.createHarvest)
router.get('/:zone_id/zoneHarvests', verifyToken, HarvestController.getHarvestsByZone)
router.get('/farm/:farm_id/farmHarvests', verifyToken, HarvestController.getHarvestsByFarm)
router.put('/:harvest_id/updateHarvest', verifyToken, HarvestController.updateHarvest)

export default router;
