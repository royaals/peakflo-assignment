
import { Request, Response, NextFunction } from 'express';
import { calculateFare } from '../utils/FareCalculator';
import { Journey, FareCalculationResult } from '../types/metro';

export const calculateFares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const journeys: Journey[] = req.body.journeys;

    if (!Array.isArray(journeys)) {
      res.status(400).json({
        error: 'Invalid input: journeys must be an array'
      });
      return;
    }

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