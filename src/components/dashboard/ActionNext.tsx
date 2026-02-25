import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActionNextProps {
  weakSkills: string[];
  onStartDay1: () => void;
}

export default function ActionNext({ weakSkills, onStartDay1 }: ActionNextProps) {
  const navigate = useNavigate();
  
  const topWeakSkills = weakSkills.slice(0, 3);
  
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your Next Action
          </h3>
          
          {topWeakSkills.length > 0 ? (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Focus on these skills that need more practice:
              </p>
              <div className="flex flex-wrap gap-2">
                {topWeakSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-md border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Great job! You've marked all skills as known. Ready to start your preparation?
            </p>
          )}
        </div>
        
        <button
          onClick={onStartDay1}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
        >
          Start Day 1 Plan
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-100">
        <p className="text-xs text-gray-500">
          Tip: Begin with Day 1 of your 7-day preparation plan to build a strong foundation
        </p>
      </div>
    </section>
  );
}