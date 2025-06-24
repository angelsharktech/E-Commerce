import express from 'express'
import { addFeedback } from '../controller/feedback.js';

const router = express.Router();

router.post('/addFeedback', addFeedback);
export default router;
