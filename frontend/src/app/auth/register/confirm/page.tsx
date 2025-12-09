"use client"
import Image from "next/image";

interface ConfirmEmailProps {
  email: string;
  otp: string;
  setOtp: (value: string) => void;
  handleVerifyOTP: (e: React.FormEvent) => void;
  handleResendCode: () => void;
  isPending: boolean;
  isResending: boolean;
  error: string | null;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({
  email,
  otp,
  setOtp,
  handleVerifyOTP,
  handleResendCode,
  isPending,
  isResending,
  error,
}) => {
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

          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === "string"
                ? error
                : (error as any)?.response?.data?.message}
            </p>
          )}
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
              disabled={isPending}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition text-sm cursor-pointer"
            >
              {isPending ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className={`text-blue-600 hover:underline cursor-pointer ${
                isResending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
