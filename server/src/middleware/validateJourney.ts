import { Request, Response, NextFunction } from 'express';
import { Journey, MetroLine } from '../types/metro';
import { AppError } from './errorHandler';

export const validateJourneyData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const journeys: Journey[] = req.body.journeys;

    if (!Array.isArray(journeys)) {
      throw new AppError(400, 'Invalid input: journeys must be an array');
    }

    const validLines: MetroLine[] = ['Red', 'Green'];

    journeys.forEach((journey, index) => {
      if (!journey.fromLine || !journey.toLine || !journey.dateTime) {
        throw new AppError(400, `Journey at index ${index} is missing required fields`);
      }

      if (!validLines.includes(journey.fromLine) || !validLines.includes(journey.toLine)) {
        throw new AppError(400, `Invalid line in journey at index ${index}`);
      }

      if (isNaN(Date.parse(journey.dateTime))) {
        throw new AppError(400, `Invalid date format in journey at index ${index}`);
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};