import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProgressData } from "./query"; // ✅ Import update function

// ✅ Define the FoodItem type
interface FoodItem {
  name: string;
  calories: number;
}

interface FoodIntakeProps {
  food: FoodItem[];
  setFood: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  userId: string; // ✅ Added userId as a prop
}

const FoodIntake: React.FC<FoodIntakeProps> = ({ food, setFood, userId }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  // ✅ Mutation for updating progress
  const mutation = useMutation({
    mutationFn: (newProgressData: any) => updateProgressData(userId, newProgressData),
    onSuccess: (data) => {
      console.log("Progress updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating progress:", error);
    },
  });

  const addFood = () => {
    if (name && calories) {
      const newFoodItem = { name, calories: Number(calories) };
      const updatedFood = [...food, newFoodItem];

      // ✅ Update local state
      setFood(updatedFood);

      // ✅ Call API to update progress
      mutation.mutate({
        caloriesConsumed: Number(calories),
        foodName: name,
        date: new Date().toISOString(),
      });

      // ✅ Reset input fields
      setName("");
      setCalories("");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl text-purple-300 font-semibold mb-4">🍽️ Food Intake</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food Name"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <button
        onClick={addFood}
        className="bg-purple-500 hover:bg-purple-600 transition p-3 rounded-lg font-bold w-full"
      >
        Add Food
      </button>
      <ul className="mt-4 text-sm text-gray-300">
        {food.map((item, index) => (
          <li key={index}>
            {item.name}: {item.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodIntake;
