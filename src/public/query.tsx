import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

// User Registration
export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      name: string;
      email: string;
      image: any;
      phone: string;
      password: string;
    }) => axios.post(`${API_BASE_URL}/auth/register`, data),
  });
};

// User Login
export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) =>
      axios.post(`${API_BASE_URL}/auth/login`, data),
  });
};

// Update User Information
export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data: {
      userId: string;
      name: string;
      phone: string;
      image: any;
    }) =>
      axios.put(`${API_BASE_URL}/auth/update/${data.userId}`, {
        name: data.name,
        phone: data.phone,
        image: data.image,
      }),
  });
};

// Fetch All Food Items
export const useGetFoods = () => {
  return useQuery({
    queryKey: ["GET_FOODS"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/foods`);
      return response.data.data; // Access the 'data' field here
    },
  });
};


// Add a New Food Item
export const useAddFood = () => {
  return useMutation({
    mutationKey: ["ADD_FOOD"],
    mutationFn: (data: { name: string; calorie: number }) =>
      axios.post(`${API_BASE_URL}/foods`, data),
  });
};

// Update Food Item
export const useUpdateFood = () => {
  return useMutation({
    mutationKey: ["UPDATE_FOOD"],
    mutationFn: (data: { id: string; name: string; calorie: number }) =>
      axios.put(`${API_BASE_URL}/foods/${data.id}`, {
        name: data.name,
        calorie: data.calorie,
      }),
  });
};

// Delete Food Item
export const useDeleteFood = () => {
  return useMutation({
    mutationKey: ["DELETE_FOOD"],
    mutationFn: (id: string) => axios.delete(`${API_BASE_URL}/foods/${id}`),
  });
};

// Update User Progress
export const useUpdateProgress = () => {
  return useMutation({
    mutationKey: ["UPDATE_PROGRESS"],
    mutationFn: (data: {
      user_id: string;
      progress_data: {
        waterIntake?: number;
        exerciseMinutes?: number;
        exerciseName?: string;
        caloriesConsumed?: number;
        foodName?: string;
        caloriesBurned?: number;
        sleepHours?: number;
      };
    }) => axios.post(`${API_BASE_URL}/progress/update`, data),
  });
};

// Update Water Intake
export const useUpdateWaterIntake = () => {
  return useMutation({
    mutationKey: ["UPDATE_WATER_INTAKE"],
    mutationFn: (data: { userId: string; waterIntake: number }) =>
      axios.put(`${API_BASE_URL}/progress/${data.userId}/updateWaterIntake`, {
        waterIntake: data.waterIntake,
      }),
  });
};

// Update Exercise Data
export const useUpdateExercise = () => {
  return useMutation({
    mutationKey: ["UPDATE_EXERCISE"],
    mutationFn: (data: { userId: string; exerciseMinutes: number; exerciseName: string, caloriesBurned: number }) =>
      axios.put(`${API_BASE_URL}/progress/${data.userId}/updateExercise`, {
        exerciseMinutes: data.exerciseMinutes,
        exerciseName: data.exerciseName,
        caloriesBurned: data.caloriesBurned,
      }),
  });
};

// Update Calories Consumed
export const useUpdateCaloriesConsumed = () => {
  return useMutation({
    mutationKey: ["UPDATE_CALORIES_CONSUMED"],
    mutationFn: (data: { userId: string; caloriesConsumed: number; foodName: string }) =>
      axios.put(`${API_BASE_URL}/progress/${data.userId}/updateCaloriesConsumed`, {
        caloriesConsumed: data.caloriesConsumed,
        foodName: data.foodName,
      }),
  });
};

// Update Calories Burned
export const useUpdateCaloriesBurned = () => {
  return useMutation({
    mutationKey: ["UPDATE_CALORIES_BURNED"],
    mutationFn: (data: { userId: string; caloriesBurned: number }) =>
      axios.put(`${API_BASE_URL}/progress/${data.userId}/updateCaloriesBurned`, {
        caloriesBurned: data.caloriesBurned,
      }),
  });
};

// Update Sleep Hours
export const useUpdateSleep = () => {
  return useMutation({
    mutationKey: ["UPDATE_SLEEP"],
    mutationFn: (data: { userId: string; sleepHours: number }) =>
      axios.put(`${API_BASE_URL}/progress/${data.userId}/updateSleep`, {
        sleepHours: data.sleepHours,
      }),
  });
};

// Delete a Specific Progress Entry
export const useDeleteProgressEntry = () => {
  return useMutation({
    mutationKey: ["DELETE_PROGRESS_ENTRY"],
    mutationFn: (data: { userId: string; entryId: string }) =>
      axios.delete(`${API_BASE_URL}/progress/${data.userId}/${data.entryId}`),
  });
};

// Fetch User Progress
export const useGetUserProgress = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_PROGRESS", userId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/progress/${userId}`);
      console.log("API Response:", response);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Fetch All Exercise Items
export const useGetItemExercises = () => {
  return useQuery({
    queryKey: ["GET_EXERCISES"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/exercises`);
      return response.data.data; // Access the 'data' field here
    },
  });
};

// Add a New Exercise Item
export const useAddExerciseItem = () => {
  return useMutation({
    mutationKey: ["ADD_EXERCISE"],
    mutationFn: (data: { name: string; caloriesBurnedPerMinute: number }) =>
      axios.post(`${API_BASE_URL}/exercises`, data),
  });
};

// Update Exercise Item
export const useUpdateExerciseItem = () => {
  return useMutation({
    mutationKey: ["UPDATE_EXERCISE"],
    mutationFn: (data: { id: string; name: string; caloriesBurnedPerMinute: number }) =>
      axios.put(`${API_BASE_URL}/exercises/${data.id}`, {
        name: data.name,
        caloriesBurnedPerMinute: data.caloriesBurnedPerMinute,
      }),
  });
};

// Delete Exercise Item
export const useDeleteExerciseItem = () => {
  return useMutation({
    mutationKey: ["DELETE_EXERCISE"],
    mutationFn: (id: string) => axios.delete(`${API_BASE_URL}/exercises/${id}`),
  });
};
