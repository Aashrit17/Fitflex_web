import React from 'react';

// Define the types for the props
interface ProgressTrackerProps {
  totalCalories: number;
  caloriesBurned: number;
  goal: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalCalories, caloriesBurned, goal }) => {
  const progress = Math.min((totalCalories - caloriesBurned) / goal, 1) * 100;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl text-purple-300 font-semibold mb-4">📊 Progress</h2>
      <p className="text-sm mb-2">🔥 Calories Consumed: <span className="font-bold">{totalCalories} kcal</span></p>
      <p className="text-sm mb-2">💪 Calories Burned: <span className="font-bold">{caloriesBurned} kcal</span></p>
      <p className="text-sm mb-2">🎯 Goal: <span className="font-bold">{goal} kcal</span></p>
      <div className="w-full bg-gray-800 h-5 rounded-full overflow-hidden mt-3">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressTracker;
