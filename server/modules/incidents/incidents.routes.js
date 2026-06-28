import express from 'express'
import incidentsController from './incidents.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const router = express.Router()

router.post('/:zone_id/createIncident', verifyToken, incidentsController.createIncident)
router.get('/farm/:farm_id/farmIncidents', verifyToken, incidentsController.getIncidentsByFarm)
router.put('/:incident_id/updateIncident', verifyToken, incidentsController.updateIncident)

export default router
