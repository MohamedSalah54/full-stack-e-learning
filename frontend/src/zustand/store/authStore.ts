import { create } from "zustand";
import {
  signupApi,
  confirmEmailApi,
  loginApi,
  forgetPasswordApi,
  resetPasswordApi,
  getMeApi,
  resendCodeApi,
} from "@/axios/services/auth/auth";
import { ISignupPayload, IUser } from "@/types/user";
import Cookies from "js-cookie";


type AuthState = {
  user: IUser | null;
  loading: boolean;
  error: string | null;

  setUser: (user: IUser | null) => void;

  signup: (data: ISignupPayload) => Promise<any>;
  confirmEmail: (data: { email: string; otp: string }) => Promise<any>;
  login: (data: { email: string; password: string }) => Promise<any>;
  forgetPassword: (data: { email: string }) => Promise<any>;
  resetPassword: (data: {
    email: string;
    otp: string; 
    newPassword: string;
  }) => Promise<any>;
  getMe: () => Promise<any>;
  logout: () => void;
  resendCode: (email: string) => Promise<void>;
};


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => {
    console.log("✅ setUser called with:", user);
    set({ user });
  },

  // getMe: async () => {
  //   const token =
  //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //   if (!token) {
  //     console.log("🚫 No token found in localStorage");
  //     return;
  //   }

  //   try {
  //     const res = await getMeApi();
  //     set({ user: res.data.user });
  //     return res.data;
  //   } catch (err) {
  //     console.error("❌ getMe failed", err);
  //     set({ user: null });
  //   }
  // },

  // logout: () => {
  //   set({ user: null });
  // },

  // login: async (data) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await loginApi(data);

  //     if (res.data.accessToken) {
  //       localStorage.setItem("token", res.data.accessToken);

  //       await useAuthStore.getState().getMe();
  //     }
  //     return res.data;
  //   } catch (err: any) {
  //     set({ error: err?.response?.data?.message || "Login failed" });
  //     throw err;
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
   getMe: async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.log("🚫 No token found in cookies");
      return;
    }

    try {
      const res = await getMeApi();
      set({ user: res.data.user });
      return res.data;
    } catch (err) {
      console.error("❌ getMe failed", err);
      set({ user: null });
    }
  },

  logout: () => {
    Cookies.remove("token");
    set({ user: null });
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await loginApi(data);

      if (res.data.accessToken) {
        // حفظ التوكن في كوكي آمنة
        Cookies.set("token", res.data.accessToken, {
          secure: true,
          sameSite: "Strict",
        });

        await useAuthStore.getState().getMe();
      }

      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Login failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Signup failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  confirmEmail: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await confirmEmailApi(data);
      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "OTP is incorrect" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  resendCode: async (email) => {
    set({ loading: true, error: null });
    try {
      await resendCodeApi(email);
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to resend code",
      });
    } finally {
      set({ loading: false });
    }
  },

  forgetPassword: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await forgetPasswordApi(data);
      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Forget password failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (data: {
    email: string;
    otp: string;
    newPassword: string;
  }) => {
    set({ loading: true, error: null });
    try {
         const payload = {
      email: data.email,
      code: data.otp, 
      password: data.newPassword, 
    };
      const res = await resetPasswordApi(payload);
      // const res = await resetPasswordApi(data);
      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Reset failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
