"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IUser, UserRoles, ISignupPayload } from "@/types/user";
import { useSignUp } from "@/query/auth/useSignUp";
import { useAuthStore } from "@/zustand/store/authStore";

export const useRegisterLogic = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { mutate: signUp, isPending, error } = useSignUp();

  const [form, setForm] = useState<ISignupPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRoles.STUDENT,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signUp(form, {
      onSuccess: (res) => {
        setUser?.(res?.data?.user as IUser);
        router.push(`/auth/register/confirm?email=${form.email}`);
      },
      onError: (err: any) => {
        console.error("Signup error:", err);
        toast.error(err?.response?.data?.message || "Signup failed");
      },
    });
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isPending,
    error,
  };
};
