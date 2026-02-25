/* ============================================================
 * localStorage Persistence for Analysis History
 * ============================================================ */

import type { AnalysisEntry } from './analysis-engine';

const STORAGE_KEY = 'placement-prep-history';

export function getHistory(): AnalysisEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalysisEntry[];
  } catch {
    return [];
  }
}

export function saveEntry(entry: AnalysisEntry): void {
  const history = getHistory();
  history.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getEntryById(id: string): AnalysisEntry | undefined {
  return getHistory().find((e) => e.id === id);
}

export function getLatestEntry(): AnalysisEntry | undefined {
  const history = getHistory();
  return history.length > 0 ? history[0] : undefined;
}

export function deleteEntry(id: string): void {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function updateSkillConfidence(entryId: string, skill: string, confidence: 'know' | 'practice'): void {
  const history = getHistory();
  const entryIndex = history.findIndex(e => e.id === entryId);
  if (entryIndex !== -1) {
    const entry = history[entryIndex];
    if (!entry.skillConfidenceMap) {
      entry.skillConfidenceMap = {};
    }
    entry.skillConfidenceMap[skill] = confidence;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function updateReadinessScore(entryId: string, newScore: number): void {
  const history = getHistory();
  const entryIndex = history.findIndex(e => e.id === entryId);
  if (entryIndex !== -1) {
    history[entryIndex].readinessScore = newScore;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}
