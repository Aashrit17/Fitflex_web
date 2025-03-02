import { useState, useEffect } from "react";
import { useUpdateWaterIntake } from "./query"; // ✅ Import the mutation hook

interface WaterIntakeTrackerProps {
  waterIntake: number;
  setWaterIntake: React.Dispatch<React.SetStateAction<number>>;
}

const WaterIntakeTracker: React.FC<WaterIntakeTrackerProps> = ({
  waterIntake,
  setWaterIntake,
}) => {
  const [customGoal, setCustomGoal] = useState(3000); // Default daily goal
  const { mutate: updateWaterIntake, isPending } = useUpdateWaterIntake();

  // Get user ID from local storage or context
  const userId = localStorage.getItem("userId");

  // Handle increasing water intake by 250ml
  const handleIncrease = () => {
    const newWaterIntake = waterIntake + 250;
    setWaterIntake(newWaterIntake);

    // Update water intake on the server
    if (userId) {
      updateWaterIntake({ userId, waterIntake: newWaterIntake });
    }
  };

  // Handle decreasing water intake by 50ml
  const handleDecrease = () => {
    const newWaterIntake = Math.max(waterIntake - 50, 0);
    setWaterIntake(newWaterIntake);

    // Update water intake on the server
    if (userId) {
      updateWaterIntake({ userId, waterIntake: newWaterIntake });
    }
  };

  const progress = (waterIntake / customGoal) * 100;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full text-white">
      <h2 className="text-xl text-blue-400 font-semibold mb-4">💧 Water Intake Tracker</h2>

      {/* Water Goal Input */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-300">Daily Goal (ml):</label>
        <input
          type="number"
          value={customGoal}
          onChange={(e) => setCustomGoal(Number(e.target.value))}
          className="p-2 bg-gray-800 text-white rounded-md w-20 text-center"
        />
      </div>

      {/* Water Intake Display & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleDecrease}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          disabled={isPending}
        >
          -50ml
        </button>
        <span className="text-lg font-bold">{waterIntake} ml</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          disabled={isPending}
        >
          +250ml
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-4 mt-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Goal Status */}
      <p className="text-sm text-gray-300 mt-2">
        {waterIntake >= customGoal
          ? "✅ Goal reached! Stay hydrated!"
          : `🚰 ${customGoal - waterIntake} ml left to reach your goal`}
      </p>
    </div>
  );
};

export default WaterIntakeTracker;
