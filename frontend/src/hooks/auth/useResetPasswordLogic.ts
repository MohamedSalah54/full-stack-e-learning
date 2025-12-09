"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPassword } from "@/query/auth/useResetPassword";

export const useResetPasswordLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: resetPassword, isPending, error } = useResetPassword();

  useEffect(() => {
    if (!email) {
      router.push("/auth/login/forget-password");
    }
  }, [email, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resetPassword(
      {
        email,
        otp: otp.trim(),
        newPassword: password.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully");
          router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to reset password");
        },
      }
    );
  };

  return { email, otp, setOtp, password, setPassword, handleSubmit, isPending, error };
};
