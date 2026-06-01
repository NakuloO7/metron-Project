import express from 'express'
const router = express.Router();
import { scanRepository } from '../controllers/scanController.js';

router.post('/scan', scanRepository);


export default router;