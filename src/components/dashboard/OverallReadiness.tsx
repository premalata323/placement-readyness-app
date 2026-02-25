const radius = 80;
const circumference = 2 * Math.PI * radius;
const score = 72;
const progress = (score / 100) * circumference;
const offset = circumference - progress;

export default function OverallReadiness() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Readiness</h3>
      <div className="relative w-48 h-48">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 192 192">
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="hsl(245, 58%, 51%)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{score}</span>
          <span className="text-sm text-gray-500 mt-1">Readiness Score</span>
        </div>
      </div>
    </div>
  );
}
