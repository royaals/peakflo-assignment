import express from 'express';
import { calculateFares } from '../controllers/FareContoller';
import { validateJourneyData } from '../middleware/validateJourney';

const router = express.Router();

router.post('/calculate', validateJourneyData, calculateFares);

export default router;