/* ============================================================
 * localStorage Persistence for Analysis History
 * With schema validation and corruption handling
 * ============================================================ */

import type { AnalysisEntry } from './analysis-engine';
import { validateAnalysisEntrySchema } from './validation';

const STORAGE_KEY = 'placement-prep-history';

export function getHistory(): AnalysisEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Validate each entry and filter out corrupted ones
    const validEntries: AnalysisEntry[] = [];
    const corruptedEntries: string[] = [];
    
    for (const entry of parsed) {
      if (validateAnalysisEntrySchema(entry)) {
        validEntries.push(entry as AnalysisEntry);
      } else {
        corruptedEntries.push(entry.id || 'unknown');
        console.warn('Skipping corrupted entry:', entry.id);
      }
    }
    
    if (corruptedEntries.length > 0) {
      console.warn(`Skipped ${corruptedEntries.length} corrupted entries`);
      // Show user-friendly message (this would be handled in the UI component)
    }
    
    return validEntries;
  } catch (error) {
    console.error('Error loading history from localStorage:', error);
    return [];
  }
}

export function saveEntry(entry: AnalysisEntry): void {
  try {
    const history = getHistory();
    history.unshift(entry); // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving entry to localStorage:', error);
    // In a real app, you might want to show a user-friendly error message
  }
}

export function getEntryById(id: string): AnalysisEntry | undefined {
  return getHistory().find((e) => e.id === id);
}

export function getLatestEntry(): AnalysisEntry | undefined {
  const history = getHistory();
  return history.length > 0 ? history[0] : undefined;
}

export function deleteEntry(id: string): void {
  try {
    const history = getHistory().filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error deleting entry from localStorage:', error);
  }
}

export function updateSkillConfidence(entryId: string, skill: string, confidence: 'know' | 'practice'): void {
  try {
    const history = getHistory();
    const entryIndex = history.findIndex(e => e.id === entryId);
    if (entryIndex !== -1) {
      const entry = history[entryIndex];
      if (!entry.skillConfidenceMap) {
        entry.skillConfidenceMap = {};
      }
      entry.skillConfidenceMap[skill] = confidence;
      entry.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error updating skill confidence:', error);
  }
}

export function updateReadinessScore(entryId: string, newScore: number): void {
  try {
    const history = getHistory();
    const entryIndex = history.findIndex(e => e.id === entryId);
    if (entryIndex !== -1) {
      history[entryIndex].finalScore = newScore;
      history[entryIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error updating readiness score:', error);
  }
}

// Migration function for backward compatibility
export function migrateLegacyEntries(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    
    let needsMigration = false;
    const migratedEntries = parsed.map((entry: any) => {
      // Check if this is a legacy entry (missing new fields)
      if (!('baseScore' in entry) || !('finalScore' in entry) || !('updatedAt' in entry)) {
        needsMigration = true;
        
        // Add missing fields
        const migratedEntry = {
          ...entry,
          baseScore: entry.readinessScore || 35,
          finalScore: entry.readinessScore || 35,
          updatedAt: entry.createdAt || new Date().toISOString(),
          company: entry.company || '',
          role: entry.role || '',
          // Convert legacy ExtractedSkills to StandardizedExtractedSkills if needed
          extractedSkills: migrateExtractedSkills(entry.extractedSkills)
        };
        
        return migratedEntry;
      }
      return entry;
    });
    
    if (needsMigration) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedEntries));
      console.log('Successfully migrated legacy entries to new schema');
    }
  } catch (error) {
    console.error('Error migrating legacy entries:', error);
  }
}

function migrateExtractedSkills(legacySkills: any): any {
  // If it's already in the new format, return as-is
  if (legacySkills && typeof legacySkills === 'object' && 'coreCS' in legacySkills) {
    return legacySkills;
  }
  
  // Convert legacy format to new standardized format
  const standardized: any = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  };
  
  if (legacySkills && typeof legacySkills === 'object') {
    // Map legacy categories to new ones
    if (Array.isArray(legacySkills['Core CS'])) {
      standardized.coreCS = legacySkills['Core CS'];
    }
    if (Array.isArray(legacySkills['Languages'])) {
      standardized.languages = legacySkills['Languages'];
    }
    if (Array.isArray(legacySkills['Web'])) {
      standardized.web = legacySkills['Web'];
    }
    if (Array.isArray(legacySkills['Data'])) {
      standardized.data = legacySkills['Data'];
    }
    if (Array.isArray(legacySkills['Cloud/DevOps'])) {
      standardized.cloud = legacySkills['Cloud/DevOps'];
    }
    if (Array.isArray(legacySkills['Testing'])) {
      standardized.testing = legacySkills['Testing'];
    }
  }
  
  return standardized;
}
