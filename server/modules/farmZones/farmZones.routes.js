import express from 'express';
import farmZonesController from './farmZones.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/:farm_id/createZones', verifyToken, farmZonesController.createZones);
router.get('/:farm_id/zones', verifyToken, farmZonesController.getZonesByFarm);
router.put('/:zone_id/updateZone', verifyToken, farmZonesController.updateZone);
router.delete('/:zone_id/deleteZone', verifyToken, farmZonesController.deleteZone);

export default router; 