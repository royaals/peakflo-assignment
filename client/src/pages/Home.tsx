
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import type { FareCalculationResult, Journey, MetroLine } from '../types/metro';
import { calculateFares } from '../utils/api';
import { FareDisplay } from '../components/FareDisplay';
import { FareRules } from '../components/FareRules';
import { MetroMap } from '../components/MetroMap';
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Home() {
  const [results, setResults] = useState<FareCalculationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
 

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResults([]);

    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const dataLines = lines.slice(1);

      const journeys: Journey[] = dataLines.map((line) => {
        const [fromLine, toLine, dateTime] = line.split(',').map(str => str.trim());
        return {
          fromLine: fromLine as MetroLine,
          toLine: toLine as MetroLine,
          dateTime
        };
      });

      const results = await calculateFares(journeys);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-sky-900 mb-8">Singa Metro Authority</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-sky-800 mb-4">Upload Journey Data</h2>
            <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
            {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg whitespace-pre-wrap">{error}</div>}
            <FareDisplay results={results} />
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-sky-800 mb-4">Metro Map</h2>
            <MetroMap />
          </Card>
          <Link to="/display">
          <Button className="mt-8 w-full">View Detailed Fare Display</Button>
        </Link>
          <Card className="p-6 bg-white shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-semibold text-sky-800 mb-4">Fare Rules</h2>
            <FareRules />
          </Card>
        </div>
       
      </div>
    </div>
  )
}

export default Home
