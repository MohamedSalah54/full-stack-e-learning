"use client";
import React, { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ratingData = [
  { star: "5★", value: 80 },
  { star: "4★", value: 60 },
  { star: "3★", value: 40 },
  { star: "2★", value: 20 },
  { star: "1★", value: 10 },
];

const chartData = [
  { name: "Mon", rating: 3.5 },
  { name: "Tue", rating: 4.2 },
  { name: "Wed", rating: 4.7 },
  { name: "Thu", rating: 3.8 },
  { name: "Fri", rating: 4.9 },
  { name: "Sat", rating: 4.4 },
  { name: "Sun", rating: 3.9 },
];

export default function OverallCourseRating() {
  const [period, setPeriod] = useState("This Week");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-[480px] bg-white p-6 rounded-lg flex flex-col gap-6 border border-gray-200">
      {/* HEADER BAR */}
      <div className="w-full h-[54px] bg-white flex items-center justify-between px-5  rounded-md">
        <p className="text-lg font-semibold text-gray-900">
          Overall Course Rating
        </p>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-gray-700 text-sm"
          >
            {period}
            <ChevronDown size={18} />
          </button>

          {open && (
            <div className="absolute right-0 top-8 bg-white border rounded-md shadow-md text-sm z-50">
              {["This Week", "Monthly", "Yearly"].map((p) => (
                <p
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="text-gray-300" />

      {/* MIDDLE SECTION */}
      <div className="flex gap-6 w-[496px] h-[180px]">
        {/* LEFT CONTAINER */}
        <div className="w-[180px] h-[180px] flex flex-col items-center justify-center gap-4">
          <p className="text-4xl font-bold text-gray-900">4.7</p>

          {/* STARS */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                className={
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm text-gray-600">Overall Rating</p>
        </div>

        {/* RIGHT — CHART */}
        <div className="flex-1 w-[300px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rating" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="w-[496px] h-[158px] flex flex-col gap-3">
        {ratingData.map((row, index) => (
          <div key={index} className="flex justify-between items-center">
            {/* LEFT — STARS + NUMBER */}
            <div className="flex items-center gap-2 w-[154px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Number(row.star[0])
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <p className="text-gray-800 text-sm">{row.star}</p>
            </div>

            {/* RIGHT — PROGRESS BAR */}
            <div className="w-[330px] flex items-center gap-3">
              <div className="w-full h-[20px] bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800"
                  style={{ width: `${row.value}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-700">{row.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
