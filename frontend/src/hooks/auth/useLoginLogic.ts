"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLogin } from "@/query/auth/useLogin";

export interface LoginForm {
  email: string;
  password: string;
}

export const useLoginLogic = () => {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form, {
      onSuccess: () => {
        toast.success("Logged in successfully!");
        router.push("/");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Email or password is incorrect"
        );
      },
    });
  };

  return { form, handleChange, handleSubmit, isPending, error };
};
