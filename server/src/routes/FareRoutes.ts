import express from 'express';
import { calculateFares } from '../controllers/FareContoller';

const router = express.Router();

router.post('/calculate', calculateFares);

export default router;