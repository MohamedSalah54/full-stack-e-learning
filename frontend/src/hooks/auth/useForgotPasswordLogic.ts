"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForgetPassword } from "@/query/auth/useForgetPassword";

export const useForgotPasswordLogic = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { mutate: forgetPassword, isPending, error } = useForgetPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgetPassword(
      { email },
      {
        onSuccess: () => {
          toast.success("Verification code sent to your email");
          router.push(`/auth/login/forget-password/reset-password?email=${email}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Email is incorrect");
        },
      }
    );
  };

  return { email, handleChange, handleSubmit, isPending, error };
};
