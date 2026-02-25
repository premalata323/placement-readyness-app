/* ============================================================
 * Input Validation Utilities
 * ============================================================ */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PracticeFormValidation {
  company: string;
  role: string;
  jdText: string;
}

// Constants
export const MIN_JD_LENGTH = 200;
export const MAX_JD_LENGTH = 10000;

/**
 * Validate job description input
 */
export function validateJD(jdText: string): ValidationResult {
  const errors: string[] = [];
  
  if (!jdText || jdText.trim().length === 0) {
    errors.push('Job description is required');
  } else if (jdText.trim().length < MIN_JD_LENGTH) {
    errors.push(`This JD is too short to analyze deeply. Paste full JD for better output.`);
  } else if (jdText.trim().length > MAX_JD_LENGTH) {
    errors.push('Job description is too long. Please limit to 10,000 characters.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate practice form inputs
 */
export function validatePracticeForm(data: PracticeFormValidation): ValidationResult {
  const errors: string[] = [];
  
  // JD validation
  const jdValidation = validateJD(data.jdText);
  errors.push(...jdValidation.errors);
  
  // Company and role are optional, but if provided, validate length
  if (data.company && data.company.length > 100) {
    errors.push('Company name is too long. Please limit to 100 characters.');
  }
  
  if (data.role && data.role.length > 100) {
    errors.push('Role is too long. Please limit to 100 characters.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0];
  return errors.join(' ');
}

/**
 * Check if entry has valid schema structure
 */
export function validateAnalysisEntrySchema(entry: any): boolean {
  if (!entry) return false;
  
  const requiredFields = [
    'id', 'createdAt', 'company', 'role', 'jdText', 
    'extractedSkills', 'checklist', 'plan', 'questions',
    'baseScore', 'finalScore', 'updatedAt'
  ];
  
  // Check required fields exist
  for (const field of requiredFields) {
    if (!(field in entry)) {
      console.warn(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Validate extractedSkills structure
  const skills = entry.extractedSkills;
  const requiredSkillCategories = ['coreCS', 'languages', 'web', 'data', 'cloud', 'testing', 'other'];
  
  for (const category of requiredSkillCategories) {
    if (!Array.isArray(skills[category])) {
      console.warn(`Invalid skills category: ${category}`);
      return false;
    }
  }
  
  // Validate score ranges
  if (typeof entry.baseScore !== 'number' || entry.baseScore < 0 || entry.baseScore > 100) {
    console.warn('Invalid baseScore');
    return false;
  }
  
  if (typeof entry.finalScore !== 'number' || entry.finalScore < 0 || entry.finalScore > 100) {
    console.warn('Invalid finalScore');
    return false;
  }
  
  // Validate timestamps
  if (!isValidISODate(entry.createdAt) || !isValidISODate(entry.updatedAt)) {
    console.warn('Invalid timestamp format');
    return false;
  }
  
  return true;
}

/**
 * Check if string is valid ISO date
 */
function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Sanitize input strings
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, 10000); // Prevent extremely long inputs
}

/**
 * Validate and clean practice form data
 */
export function cleanPracticeFormData(data: PracticeFormValidation): PracticeFormValidation {
  return {
    company: sanitizeInput(data.company),
    role: sanitizeInput(data.role),
    jdText: sanitizeInput(data.jdText)
  };
}