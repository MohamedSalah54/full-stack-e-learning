"use client";
import { mastercard_img, mastercard_logo, visa_img, visa_logo } from "@/assets";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const MethodDetails: React.FC = () => {
  const [selected, setSelected] = useState<"visa" | "mastercard">("visa");

  return (
    <div className="w-[390px] h-[420px] p-3  border border-[#C5CAD3] rounded-lg flex flex-col items-center gap-4">
      {/* Top Image Container */}
      <div className="w-[300px] h-[179px]  rounded-md overflow-hidden">
        <Image
          src={selected === "visa" ? visa_logo : mastercard_logo}
          alt="card logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Name + Radio Options in the Same Row */}
      <div className="w-[300px] flex items-center justify-between mt-2">
        {/* Left: Name Label */}
        <span className="text-sm font-medium">Name</span>

        {/* Right: Radio Options */}
        <div className="flex items-center gap-4">
          {/* VISA */}
          <label className="flex items-center gap-1 cursor-pointer">
            <Image src={visa_img} alt="visa" className="w-5 h-5" />
            <input
              type="radio"
              name="cardType"
              value="visa"
              checked={selected === "visa"}
              onChange={() => setSelected("visa")}
              className="cursor-pointer"
            />
          </label>

          {/* MASTER CARD */}
          <label className="flex items-center gap-1 cursor-pointer">
            <Image src={mastercard_img} alt="mastercard" className="w-5 h-5" />
            <input
              type="radio"
              name="cardType"
              value="mastercard"
              checked={selected === "mastercard"}
              onChange={() => setSelected("mastercard")}
              className="cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Name Input Field */}
      <div className="w-[300px] h-[60px] flex flex-col gap-1">
        <input
          type="text"
          placeholder="Card Holder Name"
          className="w-[300px] h-[35px] bg-[#F3F4F6] border border-[#C5CAD3] rounded-md px-2"
        />
      </div>

      {/* Card Number */}
      <div className="w-[300px] h-[60px] flex flex-col gap-1">
        <span className="text-sm font-medium">Card Number</span>
        <input
          type="text"
          className="w-[300px] h-[35px] bg-[#F3F4F6] border border-[#C5CAD3] rounded-md px-2  "
          placeholder="Card Number"
        />
      </div>

      {/* Expiry + CVC */}
      <div className="w-[300px] flex justify-between">
        {/* MM/YY */}
        <div className="w-[146px] h-[60px] flex flex-col gap-1">
          <span className="text-sm font-medium">MM / YY</span>
          <input
            type="text"
            className="w-[144px] h-[35px] bg-[#F3F4F6] border border-[#C5CAD3] rounded-md px-2  "
            placeholder="MM/YY"
          />
        </div>

        {/* CVC */}
        <div className="w-[146px] h-[60px] flex flex-col gap-1">
          <span className="text-sm font-medium">CVC</span>
          <input
            type="text"
            className="w-[144px] h-[35px]  px-2 bg-[#F3F4F6] border border-[#C5CAD3] rounded-md "
            placeholder="CVC"
          />
        </div>
      </div>

      {/* Add Button */}
      <button className="w-[138px] h-[24px] flex items-center justify-center gap-2 mt-2 cursor-pointer">
        <CirclePlus /> Add new card
      </button>
    </div>
  );
};

export default MethodDetails;
