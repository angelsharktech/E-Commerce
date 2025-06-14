import express from 'express'
import { getMe, sendOtp, verifyOtp } from '../controller/auth.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/sendotp', sendOtp);
router.post('/verifyotp', verifyOtp);
router.get("/getMe", auth,getMe);
export default router;
