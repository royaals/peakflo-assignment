import React, { useState } from 'react';
import type { FareCalculationResult, Journey, MetroLine } from '../types/metro';
import { calculateFares } from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"


export function Display() {
  const [results, setResults] = useState<FareCalculationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResults([]);

    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());

      
      const dataLines = lines.slice(1);

      const journeys: Journey[] = [];
      const errors: string[] = [];

      dataLines.forEach((line, index) => {
        try {
          const [fromLine, toLine, dateTime] = line.split(",").map((str) => str.trim());
          journeys.push({
            fromLine: fromLine as MetroLine,
            toLine: toLine as MetroLine,
            dateTime: dateTime,
          });
        } catch (err) {
          errors.push(`Line ${index + 2}: ${err instanceof Error ? err.message : "Invalid format"}`);
        }
      });

      if (errors.length > 0) {
        setError(`Errors in CSV file:\n${errors.join("\n")}`);
        return;
      }

      const results = await calculateFares(journeys);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing the file");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-900 mb-8 text-center">
          Singa Metro Fare Display
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Journey Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mb-4"
            />
            {error && (
              <div
                className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg whitespace-pre-wrap"
                role="alert"
              >
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Fare Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Peak Hours</TableHead>
                      <TableHead>Daily Total</TableHead>
                      <TableHead>Weekly Total</TableHead>
                      <TableHead>Cap Reached</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.journey?.fromLine}</TableCell>
                        <TableCell>{result.journey?.toLine}</TableCell>
                        <TableCell>
                          {new Date(result.journey?.dateTime || '').toLocaleString()}
                        </TableCell>
                        <TableCell>${result.fare.toFixed(2)}</TableCell>
                        <TableCell>{result.isPeak ? "Yes" : "No"}</TableCell>
                        <TableCell>${result.dailyTotal.toFixed(2)}</TableCell>
                        <TableCell>${result.weeklyTotal.toFixed(2)}</TableCell>
                        <TableCell>
                          {result.reachedDailyCap
                            ? "Daily"
                            : result.reachedWeeklyCap
                            ? "Weekly"
                            : "No"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Display;