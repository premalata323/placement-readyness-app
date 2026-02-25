import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { getLatestEntry } from '../../lib/storage';
import { SKILL_CATEGORIES } from '../../lib/analysis-engine';

export default function SkillBreakdown() {
  const latest = getLatestEntry();

  // Compute category coverage as percentage
  const data = Object.entries(SKILL_CATEGORIES).map(([category, keywords]) => {
    const matched = latest?.extractedSkills[category]?.length ?? 0;
    const total = keywords.length;
    return {
      subject: category,
      score: total > 0 ? Math.round((matched / total) * 100) : 0,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#6b7280', fontSize: 13 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
          />
          <Radar
            dataKey="score"
            stroke="hsl(245, 58%, 51%)"
            fill="hsl(245, 58%, 51%)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      {!latest && (
        <p className="text-xs text-gray-400 text-center mt-2">Analyze a JD to see skill coverage</p>
      )}
    </div>
  );
}
