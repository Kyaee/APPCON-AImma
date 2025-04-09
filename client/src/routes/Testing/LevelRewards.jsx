import LevelRewards from '@/components/features/level-rewards/LevelRewards';

export default function LevelRewardsTest() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Level Up System</h1>
        <LevelRewards currentLevel={5} />
      </div>
    </div>
  );
} 