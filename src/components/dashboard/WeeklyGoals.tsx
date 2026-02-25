const solved = 12;
const goal = 20;
const percent = (solved / goal) * 100;

const days = [
  { label: 'M', active: true },
  { label: 'T', active: true },
  { label: 'W', active: true },
  { label: 'T', active: false },
  { label: 'F', active: true },
  { label: 'S', active: false },
  { label: 'S', active: false },
];

export default function WeeklyGoals() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goals</h3>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Problems Solved</span>
        <span className="text-gray-700 font-medium">{solved}/{goal} this week</span>
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
