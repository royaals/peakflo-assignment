export type MetroLine = "Red" | "Green";

export interface Journey {
  fromLine: MetroLine;
  toLine: MetroLine;
  dateTime: string;
}

export interface FareRule {
  fromLine: MetroLine;
  toLine: MetroLine;
  peakFare: number;
  nonPeakFare: number;
  dailyCap: number;
  weeklyCap: number;
}

export interface FareCalculationResult {
  fare: number;
  isPeak: boolean;
  dailyTotal: number;
  weeklyTotal: number;
  reachedDailyCap: boolean;
  reachedWeeklyCap: boolean;
  journey?: Journey;
}