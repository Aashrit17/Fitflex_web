import { useState } from "react";

interface ExerciseItem {
  name: string;
  duration: number;
  caloriesBurned: number;
}

interface ExerciseTrackerProps {
  exercise: ExerciseItem[];
  setExercise: React.Dispatch<React.SetStateAction<ExerciseItem[]>>;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ exercise, setExercise }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");

  const addExercise = () => {
    if (name && duration && caloriesBurned) {
      setExercise([...exercise, { name, duration: Number(duration), caloriesBurned: Number(caloriesBurned) }]);
      setName("");
      setDuration("");
      setCaloriesBurned("");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl text-purple-300 font-semibold mb-4">🏋️ Exercise</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Exercise Name"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (mins)"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <input
        type="number"
        value={caloriesBurned}
        onChange={(e) => setCaloriesBurned(e.target.value)}
        placeholder="Calories Burned"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <button
        onClick={addExercise}
        className="bg-purple-500 hover:bg-purple-600 transition p-3 rounded-lg font-bold w-full"
      >
        Add Exercise
      </button>
      <ul className="mt-4 text-sm text-gray-300">
        {exercise.map((item, index) => (
          <li key={index}>
            {item.name}: {item.duration} mins, {item.caloriesBurned} kcal burned
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseTracker;
