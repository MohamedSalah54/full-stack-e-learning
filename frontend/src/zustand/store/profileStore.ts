import { create } from "zustand";
import {  UpdateUserData } from "@/types/user";
import { changePassword, updateUser, uploadImage } from "@/axios/services/profile/profile";

export interface UserState {
  loading: boolean;
  error: string | null;
  updateUserProfile: (id: string, data: UpdateUserData) => Promise<void>;
  uploadProfile: (id: string, file: File) => Promise<{ public_id: string; secure_url: string } | null>; 
}

interface PasswordState {
  loading: boolean;
  message: string | null;
  error: string | null;
  changeUserPassword: (
    userId: string,
    data: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }
  ) => Promise<void>;
}

export const usePasswordStore = create<PasswordState>((set) => ({
  loading: false,
  message: null,
  error: null,

  changeUserPassword: async (userId, data) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await changePassword(userId, data);
      set({
        loading: false,
        message: res.message || "Password updated successfully",
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || "Failed to update password",
      });
    }
  },
}));




export const useUserStore = create<UserState>((set) => ({
  loading: false,
  error: null,

  updateUserProfile: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateUser(id, data);
      set({ loading: false });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "failed ";
      set({ loading: false, error: errorMessage });
    }
  },

  uploadProfile: async (_id, file) => {
  set({ loading: true, error: null });
  try {
    const { public_id, secure_url } = await uploadImage(file);
    set({ loading: false });
    return { public_id, secure_url };
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Failed to upload image";
    set({ loading: false, error: message });
    return null;
  }
}
}));

