import express from 'express'
import { addSaleBill, getSaleBill, getSaleBillById } from '../controller/salebill.js';

const router = express.Router();

router.post('/addSaleBill', addSaleBill);
router.get('/getSaleBillById/:id', getSaleBillById);
router.get('/getSaleBill', getSaleBill);

export default router;
