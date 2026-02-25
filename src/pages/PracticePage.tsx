import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Building2, Briefcase } from 'lucide-react';
import { runAnalysis } from '../lib/analysis-engine';
import { saveEntry } from '../lib/storage';

export default function PracticePage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    setLoading(true);
    // Simulate brief processing
    setTimeout(() => {
      const entry = runAnalysis(company.trim(), role.trim(), jdText.trim());
      saveEntry(entry);
      setLoading(false);
      navigate('/dashboard/resources', { state: { entryId: entry.id } });
    }, 400);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Analyze Job Description</h2>
        <p className="mt-1 text-gray-500">
          Paste a job description to get personalized preparation insights.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
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
            Job Description
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={12}
            placeholder="Paste the full job description here..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm leading-relaxed focus:outline-none focus:border-primary bg-white resize-y"
          />
          <p className="mt-1.5 text-xs text-gray-400">
            {jdText.length} characters {jdText.length > 800 && '— detailed JD detected'}
          </p>
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
