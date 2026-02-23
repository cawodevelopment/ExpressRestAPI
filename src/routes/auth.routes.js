import express from 'express';
import authenticate from '../middlewares/authentication.middleware.js';
import validate from '../middlewares/input-sanitisation.middleware.js';
import * as authController from '../controllers/auth.controller.js';
import {loginSchema, registerSchema} from '../schemas/auth.schema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.registerUser);
router.post('/login', validate(loginSchema), authController.loginUser);
router.post('/refresh', authenticate, authController.refreshToken);
router.post('/logout', authenticate, authController.logoutUser);

export default router;