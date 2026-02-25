import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  HelpCircle,
  Target,
  Tag,
  ArrowLeft,
  Clock,
  Copy,
  Download,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AnalysisEntry } from '../lib/analysis-engine';
import { hasAnySkills } from '../lib/analysis-engine';
import { getEntryById, getLatestEntry, updateSkillConfidence, updateReadinessScore } from '../lib/storage';
import SkillToggle from '../components/dashboard/SkillToggle';
import ActionNext from '../components/dashboard/ActionNext';
import { 
  copyToClipboard, 
  generatePlanText, 
  generateChecklistText, 
  generateQuestionsText, 
  generateCompleteReport,
  downloadTextAsFile
} from '../lib/export-utils';

export default function ResourcesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const entryId = (location.state as { entryId?: string } | null)?.entryId;

  const [entry, setEntry] = useState<AnalysisEntry | undefined>(() => 
    entryId ? getEntryById(entryId) : getLatestEntry()
  );
  const [liveScore, setLiveScore] = useState<number>(entry?.readinessScore || 0);
  const [copyStatus, setCopyStatus] = useState<string>('');

  // Get weak skills (practice-marked)
  const getWeakSkills = (): string[] => {
    if (!entry?.skillConfidenceMap) return [];
    return Object.entries(entry.skillConfidenceMap)
      .filter(([_, confidence]) => confidence === 'practice')
      .map(([skill, _]) => skill);
  };

  const weakSkills = getWeakSkills();

  // Initialize skill confidence map if it doesn't exist
  useEffect(() => {
    if (entry && !entry.skillConfidenceMap) {
      const updatedEntry = { ...entry };
      updatedEntry.skillConfidenceMap = {};
      Object.values(entry.extractedSkills).flat().forEach(skill => {
        updatedEntry.skillConfidenceMap![skill] = 'practice';
      });
      setEntry(updatedEntry);
    }
  }, [entry]);

  // Calculate live score based on skill confidence
  useEffect(() => {
    if (entry?.skillConfidenceMap) {
      const baseScore = entry.baseScore;
      let confidenceAdjustment = 0;
      
      Object.entries(entry.skillConfidenceMap).forEach(([skill, confidence]) => {
        if (confidence === 'know') {
          confidenceAdjustment += 2;
        } else {
          confidenceAdjustment -= 2;
        }
      });
      
      const newScore = Math.max(0, Math.min(100, baseScore + confidenceAdjustment));
      setLiveScore(newScore);
      
      // Update finalScore in localStorage if it changed
      if (newScore !== entry.finalScore && entryId) {
        updateReadinessScore(entryId, newScore);
      }
    }
  }, [entry?.skillConfidenceMap, entry?.baseScore, entry?.finalScore, entryId]);

  const handleConfidenceChange = (skill: string, confidence: 'know' | 'practice') => {
    if (!entry || !entryId) return;
    
    // Update local state
    const updatedEntry = { ...entry };
    if (!updatedEntry.skillConfidenceMap) {
      updatedEntry.skillConfidenceMap = {};
    }
    updatedEntry.skillConfidenceMap[skill] = confidence;
    setEntry(updatedEntry);
    
    // Update in localStorage
    updateSkillConfidence(entryId, skill, confidence);
  };

  // Export functions
  const copyPlan = async () => {
    if (!entry) return;
    const planText = generatePlanText(entry.plan);
    const success = await copyToClipboard(planText);
    setCopyStatus(success ? 'Plan copied to clipboard!' : 'Failed to copy plan');
    setTimeout(() => setCopyStatus(''), 3000);
  };

  const copyChecklist = async () => {
    if (!entry) return;
    const checklistText = generateChecklistText(entry.checklist);
    const success = await copyToClipboard(checklistText);
    setCopyStatus(success ? 'Checklist copied to clipboard!' : 'Failed to copy checklist');
    setTimeout(() => setCopyStatus(''), 3000);
  };

  const copyQuestions = async () => {
    if (!entry) return;
    const questionsText = generateQuestionsText(entry.questions);
    const success = await copyToClipboard(questionsText);
    setCopyStatus(success ? 'Questions copied to clipboard!' : 'Failed to copy questions');
    setTimeout(() => setCopyStatus(''), 3000);
  };

  const downloadReport = () => {
    if (!entry) return;
    const reportText = generateCompleteReport(entry);
    const filename = `placement-readiness-${entry.company || 'analysis'}-${new Date().toISOString().split('T')[0]}.txt`;
    downloadTextAsFile(reportText, filename);
  };

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Target className="w-12 h-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Paste a job description in the Practice tab to generate your personalized preparation plan.
        </p>
        <button
          onClick={() => navigate('/dashboard/practice')}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Analyze a Job Description
        </button>
      </div>
    );
  }

  const skillsDetected = hasAnySkills(entry.extractedSkills);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-3 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {entry.company || 'Analysis'}{entry.role ? ` — ${entry.role}` : ''}
            </h2>
            <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(entry.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {/* Live Readiness Score Badge */}
          <div className="flex flex-col items-center bg-primary-50 border border-primary-200 rounded-xl px-6 py-4">
            <span className="text-3xl font-bold text-primary">{liveScore}</span>
            <span className="text-xs text-primary-600 font-medium mt-0.5">Readiness Score</span>
            {liveScore !== entry.baseScore && (
              <span className="text-xs text-gray-500 mt-1">(Live update)</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* A) Extracted Skills with Interactive Toggles */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            Key Skills Extracted
          </h3>
          {skillsDetected ? (
            <div className="space-y-3">
              {Object.entries(entry.extractedSkills).map(([category, skills]) => (
                <div key={category}>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <div key={skill} className="flex flex-col items-start gap-1">
                        <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-md border border-primary-100">
                          {skill}
                        </span>
                        <SkillToggle
                          skill={skill}
                          initialConfidence={entry.skillConfidenceMap?.[skill] || 'practice'}
                          onConfidenceChange={handleConfidenceChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No specific skills detected. Showing general fresher preparation stack.
            </p>
          )}
        </section>

        {/* B) Round-wise Checklist */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Round-wise Preparation Checklist
          </h3>
          <div className="space-y-6">
            {entry.checklist.map((round) => (
              <div key={round.round}>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {round.round}: {round.title}
                </h4>
                <ul className="space-y-1.5">
                  {round.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded border border-gray-200 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* C) 7-Day Plan */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            7-Day Preparation Plan
          </h3>
          <div className="space-y-5">
            {entry.plan.map((day, index) => (
              <div 
                key={day.day} 
                className="border-l-2 border-primary-200 pl-4"
                id={index === 0 ? 'day-1-plan' : undefined}
              >
                <h4 className="text-sm font-semibold text-gray-900">
                  {day.day} — {day.label}
                </h4>
                <ul className="mt-1.5 space-y-1">
                  {day.tasks.map((task, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#8226;</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* D) Interview Questions */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            10 Likely Interview Questions
          </h3>
          <ol className="space-y-3">
            {entry.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Export Tools */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Download className="w-5 h-5 text-primary" />
            Export Tools
          </h3>
          
          {copyStatus && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {copyStatus}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={copyPlan}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 text-primary hover:bg-primary-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy 7-day Plan
            </button>
            
            <button
              onClick={copyChecklist}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 text-primary hover:bg-primary-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy Checklist
            </button>
            
            <button
              onClick={copyQuestions}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 text-primary hover:bg-primary-100 rounded-lg transition-colors text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy Questions
            </button>
            
            <button
              onClick={downloadReport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </section>

        {/* Action Next Box */}
        <ActionNext 
          weakSkills={weakSkills}
          onStartDay1={() => {
            // Scroll to Day 1 plan section
            const day1Element = document.getElementById('day-1-plan');
            if (day1Element) {
              day1Element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>
    </div>
  );
}
