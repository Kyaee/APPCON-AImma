'use client';
import { useState } from 'react';
import AssessmentLayout from '@/components/layout/assessment/AssessmentLayout';
import AssessmentStep from '@/components/layout/assessment/AssessmentStep';

export default function Language() {
  const [language, setLanguage] = useState('English');

  return (
      <AssessmentLayout
          title="Preferred language"
          progress={10}
          nextPage="/Assessment/user-type"
          buttonPosition="top-105 justify-center" // Adjust this value to change the position
      >
          <AssessmentStep title="Choose a language" className="">
              <p className="text-white mb-10">For your convenience</p>
              <div className="w-full max-w-md mx-auto">
                  <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-12/12 p-3 rounded-2xl text-gray-800 text-center mb-6 border-2 border-black bg-white"
                  >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Chinese">Chinese</option>
                  </select>
              </div>
          </AssessmentStep>
      </AssessmentLayout>
  );
}

