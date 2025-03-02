import React from "react";
import { useGetUserProgress } from "./query";
import { useNavigate } from "react-router-dom";

interface ProgressHistory {
  date: string;
  waterIntake: number;
  exerciseMinutes: number;
  exerciseName: string;
  caloriesConsumed: number;
  foodName: string;
  caloriesBurned: number;
  sleepHours: number;
}

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // If userId doesn't exist in localStorage, redirect to login page
  if (!userId) {
    navigate("/");
    return null;
  }

  const { data, isLoading, isError } = useGetUserProgress(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent rounded-full text-purple-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching data", data);
    return <div className="text-center text-red-500">Error fetching user progress</div>;
  }

  // Check if the data structure is valid
  if (!data || !data.data) {
    console.log("No data or invalid data structure");
    return <div className="text-center text-red-500">No progress data available</div>;
  }

  // Ensure progressHistory exists and is an array
  const progressHistory = data?.data?.progressHistory;
  if (!Array.isArray(progressHistory)) {
    console.log("Progress data is empty or undefined");
    return <div className="text-center text-red-500">No progress data available</div>;
  }

  // Reverse progressHistory to show most recent at the top
  const reversedProgressHistory = [...progressHistory].reverse();

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-xl p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-white">User Progress</h1>
      <div className="bg-gray-900 shadow-lg rounded-lg p-6">

        <div className="space-y-6">
          {reversedProgressHistory.length > 0 ? (
            reversedProgressHistory.map((entry: ProgressHistory, index: number) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:border-purple-400 transition-all">
                <p className="font-medium text-xl text-purple-200">Date: {new Date(entry.date).toLocaleDateString()}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">Water Intake: <span className="text-white">{entry.waterIntake} ml</span></p>
                    <p className="text-sm text-gray-300">Exercise: <span className="text-white">{entry.exerciseName} ({entry.exerciseMinutes} min)</span></p>
                    <p className="text-sm text-gray-300">Calories Consumed: <span className="text-white">{entry.caloriesConsumed} kcal</span></p>
                    <p className="text-sm text-gray-300">Food: <span className="text-white">{entry.foodName}</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">Calories Burned: <span className="text-white">{entry.caloriesBurned} kcal</span></p>
                    <p className="text-sm text-gray-300">Sleep Hours: <span className="text-white">{entry.sleepHours} hrs</span></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No progress data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
