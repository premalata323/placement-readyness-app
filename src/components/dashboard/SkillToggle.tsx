import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface SkillToggleProps {
  skill: string;
  initialConfidence: 'know' | 'practice';
  onConfidenceChange: (skill: string, confidence: 'know' | 'practice') => void;
}

export default function SkillToggle({ skill, initialConfidence, onConfidenceChange }: SkillToggleProps) {
  const [confidence, setConfidence] = useState<'know' | 'practice'>(initialConfidence);

  const handleClick = () => {
    const newConfidence = confidence === 'know' ? 'practice' : 'know';
    setConfidence(newConfidence);
    onConfidenceChange(skill, newConfidence);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer ${
        confidence === 'know'
          ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
          : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
      }`}
    >
      {confidence === 'know' ? (
        <>
          <Check className="w-3 h-3" />
          I know this
        </>
      ) : (
        <>
          <X className="w-3 h-3" />
          Need practice
        </>
      )}
    </button>
  );
}