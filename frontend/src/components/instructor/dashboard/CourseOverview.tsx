"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Sun", blue: 200, red: 5000 },
  { name: "Mon", blue: 1000, red: 8000 },
  { name: "Tue", blue: 50000, red: 300000 },
  { name: "Wed", blue: 100000, red: 500000 },
  { name: "Thu", blue: 300000, red: 600000 },
  { name: "Fri", blue: 500000, red: 900000 },
  { name: "Sat", blue: 900000, red: 950000 },
];

export default function CourseOverview() {
  const [period, setPeriod] = useState("This Week");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-[480px] bg-white p-6 rounded-lg flex flex-col gap-6 border border-gray-200">
      {/* HEADER BAR */}
      <div className="w-full h-[54px] bg-white flex items-center justify-between px-5 rounded-md">
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Course Overview
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
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="text-gray-300 -mt-5" />

      {/* BODY — Area Chart */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, left: 10, right: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(v) => {
                if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
                if (v >= 1000) return `${v / 1000}k`;
                return v;
              }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="blue"
              stroke="#9CA3AF"
              fill="#9CA3AF"
            />{" "}
            {/* gray-400 */}
            <Area
              type="monotone"
              dataKey="red"
              stroke="#1F2937"
              fill="#1F2937"
            />{" "}
            {/* gray-800 */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
