
import type { FareCalculationResult } from '../types/metro'

interface FareDisplayProps {
    results: FareCalculationResult[]
  }
  
  export function FareDisplay({ results }: FareDisplayProps) {
    if (results.length === 0) {
      return <div className="text-sky-600">Upload a CSV file to calculate fares</div>
    }
  
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-800">Calculation Results</h3>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="p-4 rounded-lg bg-sky-50 border border-sky-100">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Fare:</div>
                <div className="font-semibold">${result.fare.toFixed(2)}</div>
                <div>Peak Hours:</div>
                <div className="font-semibold">{result.isPeak ? "Yes" : "No"}</div>
                <div>Daily Total:</div>
                <div className="font-semibold">${result.dailyTotal.toFixed(2)}</div>
                <div>Weekly Total:</div>
                <div className="font-semibold">${result.weeklyTotal.toFixed(2)}</div>
                {result.reachedDailyCap && <div className="col-span-2 text-sky-600">Daily cap reached!</div>}
                {result.reachedWeeklyCap && <div className="col-span-2 text-sky-600">Weekly cap reached!</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  ;