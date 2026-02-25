import { useNavigate } from 'react-router-dom';
import { History, Trash2, ExternalLink, Target, AlertTriangle } from 'lucide-react';
import { getHistory, deleteEntry, migrateLegacyEntries } from '../lib/storage';
import { useState, useEffect } from 'react';
import type { AnalysisEntry } from '../lib/analysis-engine';

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisEntry[]>([]);
  const [corruptedCount, setCorruptedCount] = useState(0);

  useEffect(() => {
    // Run migration on component mount
    migrateLegacyEntries();
    
    // Get history and count corrupted entries
    const allEntries = getHistory();
    setHistory(allEntries);
    
    // In a real implementation, you'd get the corrupted count from storage
    // For now, we'll simulate this
    const raw = localStorage.getItem('placement-prep-history');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const validCount = allEntries.length;
          const totalCount = parsed.length;
          setCorruptedCount(totalCount - validCount);
        }
      } catch {
        setCorruptedCount(0);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setHistory(getHistory());
  };

  const handleOpen = (id: string) => {
    navigate('/dashboard/resources', { state: { entryId: id } });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <History className="w-6 h-6 text-primary" />
          Analysis History
        </h2>
        <p className="mt-1 text-gray-500">
          Your past job description analyses. Click to view full results.
        </p>
      </div>

      {/* Corrupted Entries Warning */}
      {corruptedCount > 0 && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-medium">
                {corruptedCount} saved entr{corruptedCount === 1 ? 'y' : 'ies'} couldn't be loaded
              </p>
              <p className="text-amber-700 text-sm mt-1">
                Create a new analysis to continue using the platform.
              </p>
            </div>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Target className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Analyze a job description to see your history here. All entries persist across refreshes.
          </p>
          <button
            onClick={() => navigate('/dashboard/practice')}
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Analyze a Job Description
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-primary-200 transition-colors"
            >
              <button
                onClick={() => handleOpen(entry.id)}
                className="flex-1 text-left cursor-pointer bg-transparent border-none p-0"
              >
                <div className="flex items-center gap-4">
                  {/* Score circle */}
                  <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{entry.finalScore}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {entry.company || 'Unknown Company'}
                      {entry.role ? ` — ${entry.role}` : ''}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' '}
                      &middot;{' '}
                      {Object.values(entry.extractedSkills).flat().length} skills detected
                    </p>
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleOpen(entry.id)}
                  className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
                  title="View results"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
