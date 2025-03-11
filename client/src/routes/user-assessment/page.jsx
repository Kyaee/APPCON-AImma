export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-950">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="text-white text-5xl">
            <span className="text-white text-7xl">✷</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Before we begin</h1>
        <p className="text-white mb-8">Let us start by assessing you to know about you more.</p>
        <Link href="/assessment" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-8 rounded-md transition-colors">
          Begin Assessment
        </Link>
      </div>
    </div>
  );
}

import AssessmentLayout from '../components/AssessmentLayout';
import AssessmentStep from '../components/AssessmentStep';
import Link from 'react-router-dom';

export default function AssessmentStart() {
  return (
    <AssessmentLayout 
      title="Assessment"
      progress={5}
      prevPage="/"
      nextPage="/assessment/language"
      showMascot={false}
    >
      <AssessmentStep title="Before we begin">
        <p className="text-white mb-8">Let us start by assessing you to know about you more.</p>
        <Link href="/assessment/language" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-8 rounded-md transition-colors">
          Begin Assessment
        </Link>
      </AssessmentStep>
    </AssessmentLayout>
  );
}