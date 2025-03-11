'use client';
import { useState } from 'react';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';

export default function AssessmentQuestions() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });
  
  const handleChange = (question, value) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };
  
  return (
    <AssessmentLayout 
      title="Assessment"
      progress={90}
      prevPage="/assessment/daily-goal"
      nextPage="/assessment/results"
    >
      <div className="w-full max-w-md mx-auto text-white">
        <div className="mb-6">
          <label className="block mb-2">Question 1</label>
          <input
            type="text"
            value={answers.question1}
            onChange={(e) => handleChange('question1', e.target.value)}
            placeholder="Your Answer"
            className="w-full p-3 rounded-md text-gray-800"
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">Question 2</label>
          <input
            type="text"
            value={answers.question2}
            onChange={(e) => handleChange('question2', e.target.value)}
            placeholder="Your Answer"
            className="w-full p-3 rounded-md text-gray-800"
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">Question 3</label>
          <input
            type="text"
            value={answers.question3}
            onChange={(e) => handleChange('question3', e.target.value)}
            placeholder="Your Answer"
            className="w-full p-3 rounded-md text-gray-800"
          />
        </div>
      </div>
    </AssessmentLayout>
  );
}