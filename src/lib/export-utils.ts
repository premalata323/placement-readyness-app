/**
 * Utility functions for exporting content
 */

// Helper function to copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
}

// Generate formatted 7-day plan text
export function generatePlanText(plan: any[]): string {
  let text = '7-DAY PREPARATION PLAN\n';
  text += '='.repeat(50) + '\n\n';
  
  plan.forEach(day => {
    text += `${day.day} - ${day.label}\n`;
    text += '-'.repeat(30) + '\n';
    day.tasks.forEach((task: string, index: number) => {
      text += `${index + 1}. ${task}\n`;
    });
    text += '\n';
  });
  
  return text;
}

// Generate formatted checklist text
export function generateChecklistText(checklist: any[]): string {
  let text = 'ROUND-WISE PREPARATION CHECKLIST\n';
  text += '='.repeat(50) + '\n\n';
  
  checklist.forEach(round => {
    text += `${round.round}: ${round.title}\n`;
    text += '-'.repeat(40) + '\n';
    round.items.forEach((item: string, index: number) => {
      text += `${index + 1}. ${item}\n`;
    });
    text += '\n';
  });
  
  return text;
}

// Generate formatted questions text
export function generateQuestionsText(questions: string[]): string {
  let text = '10 LIKELY INTERVIEW QUESTIONS\n';
  text += '='.repeat(50) + '\n\n';
  
  questions.forEach((question, index) => {
    text += `${index + 1}. ${question}\n\n`;
  });
  
  return text;
}

// Generate complete report text
export function generateCompleteReport(entry: any): string {
  let report = `PLACEMENT READINESS REPORT\n`;
  report += '='.repeat(50) + '\n';
  report += `Company: ${entry.company || 'Not specified'}\n`;
  report += `Role: ${entry.role || 'Not specified'}\n`;
  report += `Date: ${new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}\n`;
  report += `Readiness Score: ${entry.readinessScore}\n\n`;
  
  // Skills section
  if (entry.extractedSkills && Object.keys(entry.extractedSkills).length > 0) {
    report += 'KEY SKILLS EXTRACTED\n';
    report += '-'.repeat(30) + '\n';
    Object.entries(entry.extractedSkills).forEach(([category, skills]) => {
      report += `${category}: ${(skills as string[]).join(', ')}\n`;
    });
    report += '\n';
  }
  
  // Checklist
  report += generateChecklistText(entry.checklist);
  
  // 7-day plan
  report += generatePlanText(entry.plan);
  
  // Questions
  report += generateQuestionsText(entry.questions);
  
  return report;
}

// Download text as file
export function downloadTextAsFile(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}