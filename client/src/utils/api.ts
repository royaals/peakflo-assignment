import axios from 'axios';
import type { Journey, FareCalculationResult } from '../types/metro';

const API_URL = process.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

export const calculateFares = async (journeys: Journey[]): Promise<FareCalculationResult[]> => {
  const response = await axios.post(`${API_URL}/api/fares/calculate`, { journeys });
  return response.data.results;
};