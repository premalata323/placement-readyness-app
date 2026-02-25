import { CalendarDays } from 'lucide-react';
import { getLatestEntry } from '../../lib/storage';

export default function UpcomingAssessments() {
  const latest = getLatestEntry();

  // Show top 3 checklist items from the latest analysis as upcoming tasks
  const tasks: { title: string; detail: string }[] = [];
  if (latest) {
    for (const round of latest.checklist) {
      if (tasks.length >= 3) break;
      tasks.push({
        title: `${round.round}: ${round.title}`,
        detail: `${round.items.length} checklist items to complete`,
      });
    }
  }

  if (tasks.length === 0) {
    tasks.push(
      { title: 'DSA Mock Test', detail: 'Analyze a JD to generate tasks' },
      { title: 'System Design Review', detail: 'Analyze a JD to generate tasks' },
      { title: 'HR Interview Prep', detail: 'Analyze a JD to generate tasks' },
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Rounds</h3>
      <div className="space-y-4">
        {tasks.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
