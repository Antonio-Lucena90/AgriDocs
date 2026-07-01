import express from 'express'
import adminController from './admin.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const router = express.Router()

router.get('/allUsers', verifyToken, adminController.getAllUsers)
router.post('/generateCode', verifyToken, adminController.generateCode)
router.get('/allCodes', verifyToken, adminController.getAllCodes)

export default router
