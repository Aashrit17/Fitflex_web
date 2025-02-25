import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      name: string;
      email: string;
      image: any;
      phone: string;
      password: string;
    }) => axios.post("http://localhost:3000/api/v1/auth/register", data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post("http://localhost:3000/api/v1/auth/login", data);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data: { userId: string; name: string; phone: string; image: any }) => {
      return axios.put(
        `http://localhost:3000/api/v1/auth/update/${data.userId}`,
        {
          name: data.name,
          phone: data.phone,
          image: data.image,
        }
      );
    },
  });
};



export const fetchProgress = async (userId: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/api/v1/progress/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch progress");
  }
};

export const updateProgressData = async (userId: any, progressData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/api/v1/progress/${userId}`,
      { progress_data: progressData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to update progress");
  }
};


export const useHome = () => {
  return
}