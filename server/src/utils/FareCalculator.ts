import { Journey, FareRule, FareCalculationResult, MetroLine } from '../types/metro';

const FARE_RULES: FareRule[] = [
  {
    fromLine: "Green",
    toLine: "Green",
    peakFare: 2,
    nonPeakFare: 1,
    dailyCap: 8,
    weeklyCap: 55,
  },
  {
    fromLine: "Red",
    toLine: "Red",
    peakFare: 3,
    nonPeakFare: 2,
    dailyCap: 12,
    weeklyCap: 70,
  },
  {
    fromLine: "Green",
    toLine: "Red",
    peakFare: 4,
    nonPeakFare: 3,
    dailyCap: 15,
    weeklyCap: 90,
  },
  {
    fromLine: "Red",
    toLine: "Green",
    peakFare: 3,
    nonPeakFare: 2,
    dailyCap: 15,
    weeklyCap: 90,
  },
];

export function isPeakHour(dateTime: string): boolean {
  const date = new Date(dateTime);
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = hours * 100 + minutes;

  if (day >= 1 && day <= 5) {
    // Monday to Friday
    return (time >= 800 && time <= 1000) || (time >= 1630 && time <= 1900);
  } else if (day === 6) {
    // Saturday
    return (time >= 1000 && time <= 1400) || (time >= 1800 && time <= 2300);
  } else {
    // Sunday
    return time >= 1800 && time <= 2300;
  }
}

export function calculateFare(
  journey: Journey,
  dailyTotal = 0,
  weeklyTotal = 0
): FareCalculationResult {
  const fareRule = FARE_RULES.find(
    (rule) => rule.fromLine === journey.fromLine && rule.toLine === journey.toLine
  );

  if (!fareRule) {
    throw new Error(`Invalid journey combination: ${journey.fromLine} to ${journey.toLine}`);
  }

  const isPeak = isPeakHour(journey.dateTime);
  const baseFare = isPeak ? fareRule.peakFare : fareRule.nonPeakFare;

  let fare = baseFare;
  const newDailyTotal = dailyTotal + fare;
  const newWeeklyTotal = weeklyTotal + fare;

  const reachedDailyCap = newDailyTotal >= fareRule.dailyCap;
  const reachedWeeklyCap = newWeeklyTotal >= fareRule.weeklyCap;

  if (reachedDailyCap) {
    fare = Math.max(0, fareRule.dailyCap - dailyTotal);
  } else if (reachedWeeklyCap) {
    fare = Math.max(0, fareRule.weeklyCap - weeklyTotal);
  }

  return {
    fare,
    isPeak,
    dailyTotal: dailyTotal + fare,
    weeklyTotal: weeklyTotal + fare,
    reachedDailyCap,
    reachedWeeklyCap,
  };
}