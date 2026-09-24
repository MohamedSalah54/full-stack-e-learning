"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useGetMe } from "@/query/auth/useGetMe";


import { UpdateUserData } from "@/types/user";
import { useUploadProfileImage } from "@/query/profile/useUploadImage";
import { useUserStore } from "@/zustand/store/profileStore";
import { useUpdateUserProfile } from "@/query/profile/useUpdateUser";

export const useProfileLogic = () => {
  const { data: user, isLoading } = useGetMe();

  const { setLoading, setError } = useUserStore();

  const uploadImageMutation = useUploadProfileImage();
  const updateUserMutation = useUpdateUserProfile(user?.id ?? "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔹 Local state
  const [profileImage, setProfileImage] = useState<string>("");
  const [form, setForm] = useState<UpdateUserData>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    phone: "",
    skills: [],
    qualifications: [],
    profilePicture: {
      secure_url: "",
      public_id: "",
    },
    links: {
      youtube: "",
      facebook: "",
      linkedin: "",
      x: "",
    },
  });

  // 🔹 Initialize form when user loaded
  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      phone: user.phone || "",
      skills: user.skills || [],
      qualifications: user.qualifications || [],
      profilePicture: user.profilePicture || {
        secure_url: "",
        public_id: "",
      },
      links: user.links || {
        youtube: "",
        facebook: "",
        linkedin: "",
        x: "",
      },
    });

    if (user.profilePicture?.secure_url) {
      setProfileImage(user.profilePicture.secure_url);
    }
  }, [user]);

  // 🔹 Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      links: { ...prev.links, [name]: value },
    }));
  };

  const addItem = (key: "skills" | "qualifications", value: string) => {
    if (!value.trim()) return;
    setForm((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), value.trim()],
    }));
  };

  const removeItem = (key: "skills" | "qualifications", index: number) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key]?.filter((_, i) => i !== index),
    }));
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  // 🔥 أهم جزء: رفع الصورة + تحديث البروفايل
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      setLoading(true);

      // 1️⃣ upload image
      const uploaded = await uploadImageMutation.mutateAsync(file);

      // UI update
      setProfileImage(uploaded.secure_url);

      // 2️⃣ update user profile
 await updateUserMutation.mutateAsync({
  userId: user.id,
  data: {
    profilePicture: {
      secure_url: uploaded.secure_url,
      public_id: uploaded.public_id,
    },
  },
});


      toast.success("Profile image updated successfully");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || "Failed to upload image");
      toast.error("Failed to upload image");
    }
  };

  const saveChanges = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      await updateUserMutation.mutateAsync(form);
      toast.success("Changes saved successfully");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || "Failed to save changes");
      toast.error("Failed to save changes");
    }
  };

  return {
    user,
    form,
    setForm,
    profileImage,
    fileInputRef,
    handleChange,
    handleLinkChange,
    addItem,
    removeItem,
    handleEditClick,
    handleImageUpload,
    saveChanges,
    isLoading,
  };
};
