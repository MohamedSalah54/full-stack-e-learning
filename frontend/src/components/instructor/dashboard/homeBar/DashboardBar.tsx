"use client";
import Image from "next/image";
import { Home } from "lucide-react";
import { useAuthStore } from "@/zustand/store/authStore";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function DashboardBar() {
  const user = useAuthStore((state) => state.user);
  const getMe = useAuthStore((state) => state.getMe);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !user) {
      getMe(); // يجلب بيانات المستخدم من الباك
    }
  }, [getMe, user]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const fullName =
    user?.firstName && user?.lastName
      ? `${capitalize(user.firstName)} ${capitalize(user.lastName)}`
      : "Guest";

  return (
    <div
      className="
        w-full h-[74px] bg-white rounded-xl 
        flex items-center justify-between px-5
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-2 w-[81px] h-[27px]">
        <Home size={20} className="text-gray-800" />
        <span className="text-[18px] font-semibold text-gray-800">Home</span>
      </div>

      {/* RIGHT */}
      <div className="w-[258px] h-[74px] flex items-center justify-end gap-3 pr-3">
        <div className="flex flex-col leading-[1.1]">
          <span className="text-[12px] text-gray-500">WELCOME</span>
          <span className="text-[16px] font-semibold text-gray-800">
            {fullName}
          </span>
        </div>

        {/* Avatar */}
        <div className="w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
          {user?.profilePicture?.secure_url && (
            <Image
              src={user.profilePicture.secure_url}
              alt={fullName}
              width={50}
              height={50}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
