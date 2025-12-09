"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoginLogic } from "@/hooks/auth/useLoginLogic";

const LoginPage: React.FC = () => {
  const { form, handleChange, handleSubmit, isPending, error } =
    useLoginLogic();

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="w-1/2 relative hidden md:block">
        <Image src="/signup.png" alt="Login" fill className="object-cover" />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Login to your account
          </h2>

          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === "string"
                ? error
                : (error as any)?.response?.data?.message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
              required
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-right">
            <Link
              href="/auth/login/forget-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
