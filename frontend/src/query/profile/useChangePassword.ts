import { changePassword } from "@/axios/services/profile/profile";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = (userId: string) => {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }) => changePassword(userId, data),
  });
};