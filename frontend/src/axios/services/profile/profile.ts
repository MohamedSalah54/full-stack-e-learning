import API from "@/axios/API/api";
import {  UpdateUserData } from "@/types/user";
import { AxiosResponse } from "axios";

export const updateUser = async (userId: string, data: UpdateUserData) => {
  const response = await API.patch(`auth/profile/${userId}`, data);
  return response.data;
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


