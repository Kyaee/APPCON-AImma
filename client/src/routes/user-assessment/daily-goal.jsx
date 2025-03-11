'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dailyGoals } from '@/lib/assessment-flow';
import Button from '@/components/layout/assessment/Button';

const DailyGoal = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedGoal) {
      localStorage.setItem('dailyGoal', selectedGoal);
      navigate('/assessment/interests');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How much time can you dedicate daily?</h2>
          <p className="mt-2 text-gray-600">Choose a realistic goal that fits your schedule</p>
        </div>

        <div className="grid gap-4 mt-8">
          {dailyGoals.map((goal) => (
            <button
              key={goal.id}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedGoal === goal.value
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => setSelectedGoal(goal.value)}
            >
              <h3 className="font-medium text-gray-900">{goal.label}</h3>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedGoal}
            className={!selectedGoal ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyGoal;