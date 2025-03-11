'use client';
import { useState } from 'react';

import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';


export default function AppGoals() {
  const [goalText, setGoalText] = useState('');
  
  return (
    <AssessmentLayout 
      title="Skill Level Assessment"
      progress={65}
      prevPage="/assessment/proficiency"
      nextPage="/assessment/daily-goal"
    >
      <AssessmentStep title="Goal for using this app">
        <div className="w-full max-w-md mx-auto">
          <textarea
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Describe your goals..."
            className="w-full p-3 rounded-md text-gray-800 mb-6 h-32"
          />
        </div>
      </AssessmentStep>
    </AssessmentLayout>
  );
}