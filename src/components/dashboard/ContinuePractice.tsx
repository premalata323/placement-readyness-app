import { useNavigate } from 'react-router-dom';
import { getLatestEntry } from '../../lib/storage';

export default function ContinuePractice() {
  const navigate = useNavigate();
  const latest = getLatestEntry();

  if (!latest) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Practice</h3>
        <p className="text-sm text-gray-500 mb-4">No analysis yet. Analyze a job description to get started.</p>
        <button
          onClick={() => navigate('/dashboard/practice')}
          className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Analyze JD
        </button>
      </div>
    );
  }

  const totalChecklist = latest.checklist.reduce((sum, r) => sum + r.items.length, 0);
  const completedEstimate = Math.round(totalChecklist * (latest.readinessScore / 100) * 0.3);
  const percent = totalChecklist > 0 ? Math.round((completedEstimate / totalChecklist) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Practice</h3>
      <p className="text-sm text-gray-500 mb-1">Latest analysis</p>
      <p className="text-base font-medium text-gray-900 mb-4">
        {latest.company || 'Job Analysis'}{latest.role ? ` — ${latest.role}` : ''}
      </p>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Checklist items</span>
        <span className="text-gray-700 font-medium">{totalChecklist} tasks</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button
        onClick={() => navigate('/dashboard/resources', { state: { entryId: latest.id } })}
        className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
      >
        View Results
      </button>
    </div>
  );
}
