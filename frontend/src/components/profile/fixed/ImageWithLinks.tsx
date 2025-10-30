"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaPen,
} from "react-icons/fa6";
import { Dock } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useEnrollmentStore } from "@/zustand/store/enrollment";
import { useEffect } from "react";

export default function ImageWithLinks() {
  const { enrollments, getCourseEnrollmentsCount } = useEnrollmentStore();
  const {
    user,
    profileImage,
    fileInputRef,
    handleEditClick,
    handleImageUpload,
  } = useProfile();

  useEffect(() => {
    if (user?.id) {
      getCourseEnrollmentsCount(user.id);
    }
  }, [user]);

  return (
    <div
      className="w-[1320px] h-[187px] flex justify-between items-center mx-auto relative px-8"
      style={{ opacity: 1 }}
    >
      <div className="flex items-center gap-10 w-[656px] h-[187px] relative">
        <div className="relative w-[187px] h-[187px]">
          <Image
            src={profileImage || "/default-avatar.png"}
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />

          <button
            onClick={handleEditClick}
            className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <FaPen className="text-sm" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize w-[400px]">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-gray-600 flex items-center gap-2">
            <Dock className="w-5 h-5 text-gray-800" />
            {enrollments?.length > 0 ? (
              <>
                {enrollments.length}{" "}
                {enrollments.length === 1
                  ? "Enrolled Course"
                  : "Enrolled Courses"}
              </>
            ) : (
              "No enrolled courses"
            )}
          </p>
        </div>
      </div>

      {/* links*/}
      <div className="flex items-center justify-between w-[208px] h-[40px] gap-4">
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-900 transition"
        >
          <FaFacebookF className="text-white" />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-900 transition"
        >
          <FaXTwitter className="text-white" />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-900 transition"
        >
          <FaLinkedinIn className="text-white" />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-900 transition"
        >
          <FaInstagram className="text-white" />
        </a>
      </div>
    </div>
  );
}
