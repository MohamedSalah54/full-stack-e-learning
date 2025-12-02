"use client";
import React from "react";
import { SquarePlay, NotebookPen, UserRound, BookOpenText, Users, FileCheck, FolderCheck, CreditCard     } from "lucide-react";

const data = [
  { id: 1, number: 350, label: "Enrolled Courses", icon: SquarePlay },
  { id: 2, number: 12, label: "Online Courses", icon: NotebookPen },
  { id: 3, number: "845,214", label: "Students", icon:  UserRound},
  { id: 4, number: "32,965", label: "Course Sold", icon: BookOpenText },
  { id: 5, number: 120, label: "Course Instructors", icon: Users },
  { id: 6, number: 22, label: "Active Courses", icon: FileCheck },
  { id: 7, number: "1.236", label: "Completed Courses", icon: FolderCheck  },
  { id: 8, number: "$5,221,418", label: "USD Total Earning", icon: CreditCard },
];

export default function StatusForInstructor() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="w-[271px] h-[108px] bg-[#F3F4F6] border border-[#C5CAD3] rounded-lg 
            px-8 py-4 flex items-center gap-4"
          >
            {/* ICON */}
            <div className="w-[64px] h-[64px] flex items-center justify-center  rounded-md">
              <Icon size={40} className="text-gray-700" />
            </div>

            {/* TEXT AREA */}
            <div className="w-[123px]">
              <p className="text-2xl font-bold text-gray-900">{item.number}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
