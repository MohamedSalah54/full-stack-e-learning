import { create } from "zustand";
import {  UpdateUserData } from "@/types/user";
import { updateUser, uploadImage } from "@/axios/services/profile/profile";

interface UserState {
  loading: boolean;
  error: string | null;
  updateUserProfile: (id: string, data: UpdateUserData) => Promise<void>;
  uploadProfile: (id: string, file: File) => Promise<{ public_id: string; secure_url: string } | null>; 
}




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

