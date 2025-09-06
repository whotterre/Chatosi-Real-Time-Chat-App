import express from 'express';
import { login, register, logout, updateProfilePic, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/protectRoutes.js';
const router = express.Router();

router.post('/login', login)
router.post('/register', register)         
router.post('/logout', logout)
router.put("/updateProfilePic", protectRoute, updateProfilePic)
router.get("/check", protectRoute, checkAuth)
export default router;