import API from "@/axios/API/api";

export const signupApi = (data: any) => API.post("/auth/signup", data);

export const confirmEmailApi = (data: { email: string; otp: string }) =>
  API.post("/auth/confirm", data);

export const resendCodeApi = (email: string) =>
  API.post("/auth/resend", { email });

export const loginApi = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const forgetPasswordApi = (data: { email: string }) =>
  API.post("/auth/forget-password", data);

export const resetPasswordApi = (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => API.post("/auth/reset-password", data);

export const getMeApi = () => API.get("/auth/me");
