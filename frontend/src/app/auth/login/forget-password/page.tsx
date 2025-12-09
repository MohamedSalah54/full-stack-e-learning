"use client";

import React from "react";
import Image from "next/image";
import { useForgotPasswordLogic } from "@/hooks/auth/useForgotPasswordLogic";

const ForgotPasswordPage: React.FC = () => {
  const { email, handleChange, handleSubmit, isPending, error } =
    useForgotPasswordLogic();

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/signup.png"
          alt="Forgot Password"
          fill
          className="object-cover"
        />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-gray-600">
            Enter your email to receive a reset code.
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
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {isPending ? "Sending..." : "Send Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
