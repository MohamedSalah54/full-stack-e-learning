"use client";

import { FC } from "react";
import {
  BookText,
  CircleUserRound,
  CreditCard,
  NotebookText,
} from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  number: string | number;
  label: string;
}

const Card: FC<CardProps> = ({ icon, number, label }) => {
  return (
    <div
      className="
    w-[250px] h-[108px]
    rounded-[12px] border border-gray-300
    bg-[#F3F4F6]
    flex items-center
    px-5
    gap-4
  "
    >
      {/* Icon */}
      <div className="flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-[22px] font-bold leading-none">{number}</span>
        <span className="text-[15px] text-gray-600 leading-tight">{label}</span>
      </div>
    </div>
  );
};

const EarningBrief: FC = () => {
  return (
    <div className="w-full flex gap-18">
      <Card
        icon={<NotebookText size={50} />}
        number="$11,245,00"
        label="Total Revenue"
      />
      <Card
        icon={<CircleUserRound size={50} />}
        number="$545,00"
        label="Today Revenue"
      />
      <Card
        icon={<BookText size={50} />}
        number="$32,965,00"
        label="Current Balance"
      />
      <Card
        icon={<CreditCard size={50} />}
        number="$5,221,418"
        label="USD Total Earning"
      />
    </div>
  );
};

export default EarningBrief;
