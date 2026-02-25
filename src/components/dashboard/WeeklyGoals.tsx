import { getHistory } from '../../lib/storage';

export default function WeeklyGoals() {
  const history = getHistory();
  const analysesThisWeek = history.length;

  // Show recent 7 days of activity based on analysis timestamps
  const today = new Date();
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayOfWeek = d.getDay();
    const dateStr = d.toISOString().split('T')[0];
    const hasActivity = history.some((e) => e.createdAt.startsWith(dateStr));
    return { label: dayLabels[dayOfWeek], active: hasActivity };
  });

  const goal = 5;
  const percent = Math.min(Math.round((analysesThisWeek / goal) * 100), 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goals</h3>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Analyses Completed</span>
        <span className="text-gray-700 font-medium">{analysesThisWeek}/{goal} this week</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                day.active
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {day.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
