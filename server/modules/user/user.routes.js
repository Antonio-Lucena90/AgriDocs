import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/oneUser', verifyToken, userController.oneUser); 



export default router;