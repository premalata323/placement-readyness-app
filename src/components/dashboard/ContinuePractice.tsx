export default function ContinuePractice() {
  const completed = 3;
  const total = 10;
  const percent = (completed / total) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Practice</h3>
      <p className="text-sm text-gray-500 mb-1">Last topic</p>
      <p className="text-base font-medium text-gray-900 mb-4">Dynamic Programming</p>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Progress</span>
        <span className="text-gray-700 font-medium">{completed}/{total} completed</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
        Continue
      </button>
    </div>
  );
}
