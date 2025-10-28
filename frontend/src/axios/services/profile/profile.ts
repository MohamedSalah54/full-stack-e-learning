import API from "@/axios/API/api";
import {  UpdateUserData } from "@/types/user";

export const updateUser = async (userId: string, data: UpdateUserData) => {

  const response = await API.patch(`auth/profile/${userId}`, data);
  
  return response.data;
};

export const changePassword = async (
  userId: string,
  data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
) => {
  try {
    const response = await API.patch(`/auth/change-password/${userId}`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to change password";
    throw new Error(message);
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; 
};


