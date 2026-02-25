import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Building2, Briefcase, AlertTriangle } from 'lucide-react';
import { runAnalysis } from '../lib/analysis-engine';
import { saveEntry } from '../lib/storage';
import { validatePracticeForm, formatValidationErrors } from '../lib/validation';

export default function PracticePage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleAnalyze = () => {
    const formData = { company: company.trim(), role: role.trim(), jdText: jdText.trim() };
    const validation = validatePracticeForm(formData);
    
    if (!validation.isValid) {
      setValidationError(formatValidationErrors(validation.errors));
      return;
    }
    
    setValidationError('');
    setLoading(true);
    
    // Simulate brief processing
    setTimeout(() => {
      const entry = runAnalysis(formData.company, formData.role, formData.jdText);
      saveEntry(entry);
      setLoading(false);
      navigate('/dashboard/resources', { state: { entryId: entry.id } });
    }, 400);
  };

  const handleJdChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJdText(e.target.value);
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  const isShortJd = jdText.trim().length > 0 && jdText.trim().length < 200;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Analyze Job Description</h2>
        <p className="mt-1 text-gray-500">
          Paste a job description to get personalized preparation insights.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Validation Error Message */}
        {validationError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{validationError}</p>
            </div>
          </div>
        )}

        {/* Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Building2 className="w-4 h-4" />
              Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, TCS, Infosys"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Briefcase className="w-4 h-4" />
              Role / Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. SDE-1, Frontend Developer"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
            />
          </div>
        </div>

        {/* JD Text */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            <FileText className="w-4 h-4" />
            Job Description *
          </label>
          <textarea
            value={jdText}
            onChange={handleJdChange}
            rows={12}
            placeholder="Paste the full job description here..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm leading-relaxed focus:outline-none focus:border-primary bg-white resize-y"
          />
          
          {/* JD Length Info and Warnings */}
          <div className="mt-1.5 flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {jdText.length} characters
              {jdText.length > 800 && ' — detailed JD detected'}
            </div>
            
            {isShortJd && (
              <div className="flex items-center gap-1 text-amber-600 text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Short JD - limited analysis</span>
              </div>
            )}
          </div>
          
          {/* Calm Warning for Short JD */}
          {isShortJd && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-amber-700 text-sm">
                  This JD is too short to analyze deeply. Paste full JD for better output.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!jdText.trim() || loading}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Analyzing...' : 'Analyze & Generate Plan'}
        </button>
      </div>
    </div>
  );
}
