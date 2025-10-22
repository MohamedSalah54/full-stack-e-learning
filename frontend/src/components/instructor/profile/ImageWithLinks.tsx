"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaPen,
} from "react-icons/fa6";
import { useUserStore } from "@/zustand/store/profileStore";
import { useAuthStore } from "@/zustand/store/authStore";
import { toast } from "react-toastify";
import { useCourseStore } from "@/zustand/store/courseStore";
import { Dock } from "lucide-react";
import Loader from "@/components/common/Loader";

export default function ImageWithLinks() {
  const { count, fetchInstructorCourseCount, loading } = useCourseStore();
  const uploadProfile = useUserStore((state) => state.uploadProfile);
  const user = useAuthStore((state) => state.user);
  const getMe = useAuthStore((state) => state.getMe);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    if (user?.id) {
      fetchInstructorCourseCount(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      getMe();
    } else if (user.profilePicture?.secure_url) {
      setProfileImage(user.profilePicture.secure_url);
    }
  }, [user, getMe]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploaded = await uploadProfile("", file);
    if (uploaded) {
      setProfileImage(uploaded.secure_url);

      const setUser = useAuthStore.getState().setUser;
      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        setUser({
          ...currentUser,
          profilePicture: uploaded,
        });
      }

      toast.success("Image uploaded successfully ✅");
    } else {
      toast.error("Failed to upload image ❌");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>
      {!loading && (
        <>
          <div
            className="w-[1320px] h-[187px] flex justify-between items-center mx-auto relative px-8"
            style={{ opacity: 1 }}
          >
            <div className="flex items-center gap-10 w-[456px] h-[187px] relative">
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

                {/* input empty img*/}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                  {user?.firstName} {user?.lastName}
                </h2>

                <p className="text-gray-600 flex items-center gap-2">
                  <Dock className="w-5 h-5 text-gray-800" />
                  {loading ? (
                    "Loading..."
                  ) : count !== null ? (
                    <>
                      {count} {count === 1 ? "Course" : "Courses"}
                    </>
                  ) : (
                    "No courses yet"
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
        </>
      )}
    </>
  );
}
