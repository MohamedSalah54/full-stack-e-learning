"use client";

import React from "react";
import Image from "next/image";
import { useResetPasswordLogic } from "@/hooks/auth/useResetPasswordLogic";

const ResetPasswordPage: React.FC = () => {
  const {
    email,
    otp,
    setOtp,
    password,
    setPassword,
    handleSubmit,
    isPending,
    error,
  } = useResetPasswordLogic();

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/signup.png"
          alt="Reset Password"
          fill
          className="object-cover"
        />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Reset your password
          </h2>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code we sent to:{" "}
            <span className="font-semibold text-gray-800">{email}</span>
          </p>

          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === "string"
                ? error
                : (error as any)?.response?.data?.message}
            </p>
          )}
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
              disabled={isPending}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
