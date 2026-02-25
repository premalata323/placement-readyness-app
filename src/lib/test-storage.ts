// Test Checklist Storage Utilities
const TEST_CHECKLIST_KEY = 'prp_test_checklist';

export interface TestItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  howToTest: string;
}

export interface TestChecklistState {
  items: TestItem[];
  lastUpdated: string;
}

// Predefined test items
const DEFAULT_TEST_ITEMS: TestItem[] = [
  {
    id: 'jd-validation',
    title: 'JD required validation works',
    description: 'Job Description field is required and shows error when empty',
    completed: false,
    howToTest: 'Try submitting empty JD field on Practice page - should show validation error'
  },
  {
    id: 'short-jd-warning',
    title: 'Short JD warning shows for <200 chars',
    description: 'Warning message appears when JD is less than 200 characters',
    completed: false,
    howToTest: 'Enter JD with less than 200 characters - should show warning message'
  },
  {
    id: 'skills-extraction',
    title: 'Skills extraction groups correctly',
    description: 'Extracted skills are properly categorized into 7 groups',
    completed: false,
    howToTest: 'Submit a JD and check if skills are grouped into correct categories on results page'
  },
  {
    id: 'round-mapping',
    title: 'Round mapping changes based on company + skills',
    description: 'Interview rounds adapt based on company type and required skills',
    completed: false,
    howToTest: 'Submit different JDs and verify interview rounds change accordingly'
  },
  {
    id: 'score-calculation',
    title: 'Score calculation is deterministic',
    description: 'Same inputs always produce the same readiness score',
    completed: false,
    howToTest: 'Submit same JD multiple times and verify score consistency'
  },
  {
    id: 'skill-toggles',
    title: 'Skill toggles update score live',
    description: 'Toggling skills between "know" and "practice" updates score in real-time',
    completed: false,
    howToTest: 'On results page, toggle skills and watch score update immediately'
  },
  {
    id: 'persistence',
    title: 'Changes persist after refresh',
    description: 'Skill toggles and selections survive page refresh',
    completed: false,
    howToTest: 'Toggle skills, refresh page, verify selections are maintained'
  },
  {
    id: 'history-storage',
    title: 'History saves and loads correctly',
    description: 'Analysis history is properly stored and retrieved',
    completed: false,
    howToTest: 'Submit multiple JDs, check history page for proper saving/loading'
  },
  {
    id: 'export-functionality',
    title: 'Export buttons copy the correct content',
    description: 'Export buttons properly copy formatted content to clipboard',
    completed: false,
    howToTest: 'Use export buttons and verify clipboard content is correct'
  },
  {
    id: 'no-console-errors',
    title: 'No console errors on core pages',
    description: 'Application runs without JavaScript errors in console',
    completed: false,
    howToTest: 'Navigate all pages and check browser console for errors'
  }
];

export function getTestChecklist(): TestChecklistState {
  try {
    const stored = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate structure and merge with defaults if needed
      return {
        items: mergeWithDefaults(parsed.items || []),
        lastUpdated: parsed.lastUpdated || new Date().toISOString()
      };
    }
  } catch (error) {
    console.warn('Failed to parse test checklist from localStorage:', error);
  }
  
  // Return default state
  return {
    items: DEFAULT_TEST_ITEMS,
    lastUpdated: new Date().toISOString()
  };
}

function mergeWithDefaults(storedItems: TestItem[]): TestItem[] {
  const merged = [...DEFAULT_TEST_ITEMS];
  
  // Update completion status from stored items
  storedItems.forEach(storedItem => {
    const defaultItem = merged.find(item => item.id === storedItem.id);
    if (defaultItem) {
      defaultItem.completed = storedItem.completed || false;
    }
  });
  
  return merged;
}

export function saveTestChecklist(state: TestChecklistState): void {
  try {
    const data = {
      items: state.items,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save test checklist:', error);
  }
}

export function updateTestItem(id: string, completed: boolean): void {
  const state = getTestChecklist();
  const item = state.items.find(i => i.id === id);
  if (item) {
    item.completed = completed;
    saveTestChecklist(state);
  }
}

export function resetTestChecklist(): void {
  const resetState: TestChecklistState = {
    items: DEFAULT_TEST_ITEMS.map(item => ({ ...item, completed: false })),
    lastUpdated: new Date().toISOString()
  };
  saveTestChecklist(resetState);
}

export function getCompletedCount(): number {
  const state = getTestChecklist();
  return state.items.filter(item => item.completed).length;
}

export function isAllTestsCompleted(): boolean {
  return getCompletedCount() === DEFAULT_TEST_ITEMS.length;
}

export function getProgressPercentage(): number {
  const total = DEFAULT_TEST_ITEMS.length;
  const completed = getCompletedCount();
  return Math.round((completed / total) * 100);
}