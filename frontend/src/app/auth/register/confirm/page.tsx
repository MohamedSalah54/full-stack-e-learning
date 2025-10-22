"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";


const ConfirmEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");

  const confirmEmail = useAuthStore((state) => state.confirmEmail);
  const resendCode = useAuthStore((state) => state.resendCode);

  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

const handleVerifyOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await confirmEmail({ email, otp });

    toast.success(" Email confirmed successfully!");
    router.push("/auth/login");
  } catch (err: any) {
    toast.error(err?.response?.data?.message || " Invalid OTP");
  }
};

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/signup.png"
          alt="Confirm Email"
          fill
          className="object-cover"
        />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Confirm your email
          </h2>

          <p className="text-sm text-gray-600">
            We've sent a 6-digit verification code to your email:{" "}
            <span className="font-semibold text-gray-800">{email}</span>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-800 transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={() => resendCode(email)}
              className="text-blue-600 hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
