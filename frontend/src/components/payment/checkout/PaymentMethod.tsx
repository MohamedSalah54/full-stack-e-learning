"use client";
import { mastercard_img, payment_card, visa_img } from "@/assets";
import Image from "next/image";
import { CiWallet } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";

const PaymentMethod = () => {
  return (
    <div className="w-full flex flex-col items-start">
      {/* Title */}
      <h2
        className="
          text-[#232323] font-nunito font-semibold
          text-[28px] leading-[100%]
          w-[250px] h-[38px]
        "
      >
        Payment Method
      </h2>

      {/* E-Wallet Container */}
      <div
        className="
          w-[866px] h-[55px] mt-4
          border border-[#C5CAD3]
          flex items-center gap-3 px-4 bg-gray-800
        "
      >
        <CiWallet size={28} className="text-white" />
        <span className="font-nunito text-[20px] text-white">E-Wallet</span>
      </div>

      {/* Credit Card Container */}
      <div
        className="
          w-[866px] h-[312px] mt-4
          border border-[#C5CAD3] bg-[#F3F4F6] rounded-[8px]
          flex justify-between p-6
        "
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col w-[480px]">
          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <FaRegCreditCard size={20} />
            <p className="font-nunito font-semibold text-[20px]">Credit Card</p>
          </div>

          {/* Name */}
          <label className="font-nunito text-[16px] mb-1">Name</label>
          <input
            placeholder="Enter name"
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z ]*$/.test(value)) {
                e.target.value = value;
              } else {
                e.target.value = value.replace(/[^A-Za-z ]/g, "");
              }
            }}
            className="
                    w-[478px] h-[45px]
                    border border-[#C5CAD3] rounded-[8px]
                    px-3 mb-3
                "
          />

          {/* Card Number */}
          <label className="font-nunito text-[16px] mb-1">Card Number</label>
          <input
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = value.match(/.{1,4}/g)?.join(" ") || value;
              e.target.value = value;
            }}
            className="
                        w-[478px] h-[45px]
                        border border-[#C5CAD3] rounded-[8px]
                        px-3 mb-3
                    "
          />

          {/* MM/YY + CVC */}
          <div className="flex items-center gap-4">
            <div>
              <label className="font-nunito text-[16px] mb-1">MM / YY</label>
              <input
                placeholder="MM / YY"
                maxLength={5}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length >= 3) {
                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                  }
                  e.target.value = value;
                }}
                className="
                    w-[234px] h-[45px]
                    border border-[#C5CAD3] rounded-[8px]
                    px-3
                "
              />
            </div>

            <div>
              <label className="font-nunito text-[16px] mb-1">CVC</label>
              <input
                placeholder="123"
                maxLength={3}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                className="
                        w-[234px] h-[45px]
                        border border-[#C5CAD3] rounded-[8px]
                        px-3
                    "
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center">
          {/* Visa Image */}
          <Image
            src={payment_card}
            alt="visa"
            className="w-[306px] h-[182px] object-contain"
          />

          {/* Visa – Mastercard Select Box */}
          <div
            className="
              w-[132.8px] h-[40px] mt-4
              
              flex items-center justify-around px-2
            "
          >
            <label className="flex items-center gap-2">
              <Image src={visa_img} alt="visa" className="w-6 h-6" />
              <input
                type="radio"
                name="cardType"
                value="visa"
                className="w-4 h-4 accent-[#232323]"
              />
            </label>

            <label className="flex items-center gap-2">
              <Image src={mastercard_img} alt="mc" className="w-6 h-6" />
              <input
                type="radio"
                name="cardType"
                value="mastercard"
                className="w-4 h-4 accent-[#232323]"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
