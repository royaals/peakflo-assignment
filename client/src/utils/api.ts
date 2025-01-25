import axios from 'axios';
import type { Journey, FareCalculationResult } from '../types/metro';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const calculateFares = async (journeys: Journey[]): Promise<FareCalculationResult[]> => {
  const response = await axios.post(`${API_URL}/fares/calculate`, { journeys });
  return response.data.results;
};