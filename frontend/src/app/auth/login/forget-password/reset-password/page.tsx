// app/auth/login/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const resetPassword = useAuthStore((state) => state.resetPassword);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    if (!email) {
      router.push("/auth/login/forget-password");
    }
  }, [email, router]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await resetPassword({
      email,
      otp: otp.trim(),
      newPassword: password.trim(),
    });

    toast.success("Password reset successfully");

    router.push("/auth/login");
  } catch (err: any) {
    console.error(" Reset Password Error:", err);
    toast.error(err?.response?.data?.message || " Failed to reset password");
  }
};


  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 relative hidden md:block">
        <Image src="/signup.png" alt="Reset Password" fill className="object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Reset your password</h2>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code we sent to:{" "}
            <span className="font-semibold text-gray-800">{email}</span>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
