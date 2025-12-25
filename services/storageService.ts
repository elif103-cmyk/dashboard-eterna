import { AnalysisResult } from '../types';

const STORAGE_KEY = 'eterna_analyses_v1';

export const saveAnalysis = (analysis: AnalysisResult): void => {
  try {
    const currentHistory = getHistory();
    const updatedHistory = [analysis, ...currentHistory];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save analysis", error);
  }
};

export const getHistory = (): AnalysisResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load history", error);
    return [];
  }
};

export const getAnalysisById = (id: string): AnalysisResult | undefined => {
  const history = getHistory();
  return history.find(item => item.id === id);
};
