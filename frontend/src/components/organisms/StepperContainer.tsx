"use client";
import { useState } from "react";
import CartCheckout from "@/components/payment/cart/CartCheckout";
import PaymentMethod from "@/components/payment/checkout/PaymentMethod";

interface StepperProps {
  onSuccess: () => void;
  onError: () => void;
}

export const StepperContainer: React.FC<StepperProps> = ({
  onSuccess,
  onError,
}) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      const paymentSuccess = Math.random() > 0.5; 
      
      if (paymentSuccess) onSuccess();
      else onError();
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full mx-auto">
      <div
        className="flex items-center justify-between"
        style={{ width: 148, height: 45 }}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step === 1 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
          } ml-3`}
        >
          1
        </div>
        <div
          className={`flex-1 h-[2px] mx-0 ${
            step === 1 ? "bg-gray-300" : "bg-gray-800"
          }`}
        ></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step === 2 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
          } mr-3`}
        >
          2
        </div>
      </div>

      {/*  content */}
      <div>{step === 1 ? <PaymentMethod /> : <CartCheckout />}</div>

      <button
        onClick={handleNext}
        className="w-[198px] h-[45px] rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition cursor-pointer"
      >
        {step === 1 ? "Continue" : "Complete Payment"}
      </button>
    </div>
  );
};
