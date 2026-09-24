import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUser,
  uploadImage,
  changePassword,
} from "@/axios/services/profile/profile";

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};