import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useConfirmEmail } from "@/query/auth/useConfirmEmail";
import { useResendCode } from "@/query/auth/useResendCode";

export const useConfirmEmailLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");

  const { mutate: confirmEmail, isPending, error } = useConfirmEmail();
  const { mutate: resendCode, isPending: isResending } = useResendCode();

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    confirmEmail(
      { email, otp },
      {
        onSuccess: () => {
          toast.success("Email confirmed successfully!");
          router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid OTP");
        },
      }
    );
  };

  const handleResendCode = () => {
    resendCode(email, {
      onSuccess: () => {
        toast.success("Verification code sent successfully!");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to resend code");
      },
    });
  };

  return {
    email,
    otp,
    setOtp,
    handleVerifyOTP,
    handleResendCode,
    isPending,
    isResending,
    error,
  };
};
