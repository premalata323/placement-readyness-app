import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Practice Problems',
    description: 'Solve curated coding challenges across data structures, algorithms, and more.',
  },
  {
    icon: Video,
    title: 'Mock Interviews',
    description: 'Simulate real interview scenarios with timed sessions and detailed feedback.',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Visualize your growth with detailed analytics and performance insights.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Ace Your Placement
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-xl">
          Practice, assess, and prepare for your dream job
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 px-8 py-3 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-sm text-gray-400 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
}
