import React from "react";
import { FaYoutube, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { profile_instructor } from "@/assets";

export default function ProfileImageInstructor() {
  return (
    <div className="w-[450px] h-[524px] border border-white rounded-xl flex flex-col items-center justify-start p-4 ">
      {/* Circle container */}
      <div className="w-[350px] h-[350px] rounded-full bg-gray-800 overflow-hidden flex items-center justify-center relative">
        <Image
          src={profile_instructor}
          alt="Instructor Image"
          width={696}
          height={464}
          className="absolute top-[47px] right[-172px] object-cover"
        />
      </div>

      {/* Contacts box */}
      <div className="mt-6 w-[200px] h-[97px] flex flex-col items-center justify-center  rounded-lg p-3">
        <p className="font-nunito font-bold text-lg mb-2">Contacts</p>

        <div className="flex items-center gap-4 text-xl">
          <FaYoutube className="cursor-pointer hover:text-red-500 transition" />
          <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
          <FaFacebook className="cursor-pointer hover:text-blue-600 transition" />
          <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
        </div>
      </div>
    </div>
  );
}
