import { CalendarDays } from 'lucide-react';

const assessments = [
  { title: 'DSA Mock Test', date: 'Tomorrow, 10:00 AM' },
  { title: 'System Design Review', date: 'Wed, 2:00 PM' },
  { title: 'HR Interview Prep', date: 'Friday, 11:00 AM' },
];

export default function UpcomingAssessments() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
      <div className="space-y-4">
        {assessments.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
