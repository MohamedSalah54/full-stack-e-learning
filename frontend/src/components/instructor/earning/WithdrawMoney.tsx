"use client";

import { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Check } from "lucide-react";
import { mastercard_img, paypal_img, visa_img } from "@/assets";

interface PaymentMethod {
  id: number;
  image: StaticImageData;
  number?: string; 
  name?: string;
}

const initialMethods: PaymentMethod[] = [
  { id: 1, image: visa_img, number: "1234567812345678", name: "Mohamed Salah" },
  {
    id: 2,
    image: mastercard_img,
    number: "5678123456781234",
    name: "Mohamed Salah",
  },
  {
    id: 3,
    image: paypal_img,
    number: "MohamedSalah@email.com",
    name: "Mohamed Salah",
  },
];

const WithdrawMoney: FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [balance] = useState(257000);

  const maskCardNumber = (number: string) => {
    if (number.includes("@")) return number; 
    const first4 = number.slice(0, 4);
    return `${first4} **** **** ****`;
  };

  return (
    <div className="w-[500px] h-[320px] bg-[#ffff] border border-[#C5CAD3] rounded-lg p-6 flex flex-col justify-between items-center">
      {/* Title */}
      <span className="text-gray-800 font-semibold text-lg">
        Withdraw your money
      </span>

      <hr className="w-[411px] border border-gray-300" />

      {/* Payment Methods */}
      <div className="flex flex-col gap-2 w-full items-center">
        {initialMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-[411px] min-h-[40px] flex items-center justify-between px-3 border ${
              selectedMethod === method.id
                ? "border-green-500"
                : "border-gray-300"
            } rounded cursor-pointer`}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <Image
                src={method.image}
                alt={method.name || method.id.toString()}
                width={24}
                height={24}
              />
              {method.number && (
                <span className="truncate">
                  {maskCardNumber(method.number)}
                </span>
              )}
              {method.name && <span className="truncate">{method.name}</span>}
            </div>
            {selectedMethod === method.id && (
              <Check size={16} className="text-green-500" />
            )}
          </div>
        ))}
      </div>

      {/* Balance and Withdraw Button */}
      <div className="flex justify-between items-center w-full mt-4">
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold">
            ${(balance / 1000).toLocaleString()}K
          </span>
          <span className="text-gray-600 text-sm">Current Balance</span>
        </div>
        <button className="w-[195px] h-[55px] bg-green-500 text-white rounded-lg px-8 py-3 font-semibold hover:bg-green-600 transition-all cursor-pointer">
          Withdraw money
        </button>
      </div>
    </div>
  );
};

export default WithdrawMoney;
