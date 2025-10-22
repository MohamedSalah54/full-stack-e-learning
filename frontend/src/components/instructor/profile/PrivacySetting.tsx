"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PrivacySetting = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* العنوان */}
      <h3 className="font-nunito font-semibold text-[24px] leading-[100%] text-gray-900 opacity-100">
        Account Setting
      </h3>

      {/* الحقول */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Current Password */}
        <div className="relative">
          <label className="text-gray-700 text-sm font-medium mb-2 block">
            Current Password
          </label>
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Enter current password"
            className="w-[400px] h-[45px] border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-[42px] text-gray-500"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="text-gray-700 text-sm font-medium mb-2 block">
            New Password
          </label>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter new password"
            className="w-[400px] h-[45px] border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-[42px] text-gray-500"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative col-span-2">
          <label className="text-gray-700 text-sm font-medium mb-2 block">
            Confirm New Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            className="w-[400px] h-[45px] border border-gray-300 rounded-md px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-[438px] top-[42px] text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* الزر */}
      <div className="flex justify-end -mt-12">
        <button
          className="bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 cursor-pointer"
          style={{
            width: "169px",
            height: "55px",
            borderRadius: "8px",
            padding: "15px 32px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PrivacySetting;
