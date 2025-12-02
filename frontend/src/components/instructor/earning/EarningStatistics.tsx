"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

const data = [
  { name: "1 Jan", value: 50 },
  { name: "8 Jan", value: 120 },
  { name: "16 Jan", value: 200 },
  { name: "24 Jan", value: 350 },
  { name: "31 Jan", value: 500 },
  { name: "1 Feb", value: 420 },
];

export default function EarningStatistics() {
  return (
    <div className="w-[650px] h-[320px] bg-white rounded-xl border border-gray-300 p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="text-gray-700" size={22} />
          <span className="text-gray-800 font-semibold text-lg">Statistics</span>
        </div>

        <select className="border border-gray-400 text-gray-800 rounded-md px-3 py-1 text-sm">
          <option>Jan - 2025</option>
        </select>
      </div>

      {/* Earnings */}
      <span className="text-green-600 font-bold text-4xl mb-5">$257K</span>

      {/* Chart */}
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis ticks={[0, 100, 250, 500]} domain={[0, 500]} tickFormatter={(v) => `${v}K`} />
            <XAxis dataKey="name" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
