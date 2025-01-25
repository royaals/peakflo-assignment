import { Request, Response } from 'express';
import { calculateFare } from '../utils/FareCalculator';
import { Journey, FareCalculationResult } from '../types/metro';

export const calculateFares = async (req: Request, res: Response) => {
  try {
    const journeys: Journey[] = req.body.journeys;
    
    let dailyTotal = 0;
    let weeklyTotal = 0;

    const results: FareCalculationResult[] = journeys.map((journey) => {
      const result = calculateFare(journey, dailyTotal, weeklyTotal);
      dailyTotal = result.dailyTotal;
      weeklyTotal = result.weeklyTotal;
      return { ...result, journey };
    });

    res.json({ results });
  } catch (error) {
    res.status(400).json({ 
      error: error instanceof Error ? error.message : 'An error occurred'
    });
  }
};