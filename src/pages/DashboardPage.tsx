import OverallReadiness from '../components/dashboard/OverallReadiness';
import SkillBreakdown from '../components/dashboard/SkillBreakdown';
import ContinuePractice from '../components/dashboard/ContinuePractice';
import WeeklyGoals from '../components/dashboard/WeeklyGoals';
import UpcomingAssessments from '../components/dashboard/UpcomingAssessments';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-500">Welcome back. Here's an overview of your preparation progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverallReadiness />
        <SkillBreakdown />
        <ContinuePractice />
        <WeeklyGoals />
        <UpcomingAssessments />
      </div>
    </div>
  );
}
