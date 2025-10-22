"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const forgetPassword = useAuthStore((state) => state.forgetPassword);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgetPassword({ email });

      toast.success(" Verification code sent to your email");

      router.push(`/auth/login/forget-password/reset-password?email=${email}`);
    } catch (err: any) {
      console.error(" Forget password error:", err);
      toast.error(
        err?.response?.data?.message || " Failed to send verification code"
      );
    }
  };
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
