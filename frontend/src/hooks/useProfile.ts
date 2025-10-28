import {  UpdateUserData } from "@/types/user";
import { useAuthStore } from "@/zustand/store/authStore";
import { useUserStore } from "@/zustand/store/profileStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useProfile = () => {
  // 🧩 Stores
  const updateUserProfile = useUserStore((state) => state.updateUserProfile);
  const uploadProfile = useUserStore((state) => state.uploadProfile);
  const setUser = useAuthStore((state) => state.setUser);

  const user = useAuthStore((state) => state.user);
  const getMe = useAuthStore((state) => state.getMe);

  // 🧠 Local State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email:"",
    bio: "",
    phone:"",
    skills: [] as string[],
    qualifications: [] as string[],
    profilePicture: {
      secure_url: "",
      public_id: "",
    },
     links:{
        youtube: "",
        facebook: "",
        linkedin: "",
        x: ""
    }
    
  });

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>("");

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

      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({
          ...currentUser,
          profilePicture: uploaded,
        });
      }

      toast.success("Image uploaded successfully");
    } else {
      toast.error(" Failed to upload image");
    }
  };
  useEffect(() => {
    if (!user) {
      getMe();
    } else {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        links: user.links || {
        youtube: "",
        facebook: "",
        linkedin: "",
        x: ""
    
        },
        skills: user.skills || [],
        qualifications: user.qualifications || [],
        profilePicture: user.profilePicture || {
          secure_url: "",
          public_id: "",
        },
      });
    }
  }, [user, getMe]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 تغيير روابط السوشيال
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value,
      },
    }));
  };

  // 🧠 إدارة skills و qualifications
  const addItem = (key: "skills" | "qualifications", value: string) => {
    if (!value.trim()) return;
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value.trim()],
    }));
  };

  const removeItem = (key: "skills" | "qualifications", index: number) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // 💾 save changes

  const saveChanges = async (userId: string, data: UpdateUserData) => {
    try {

      await updateUserProfile(userId, data);
      console.log(userId,data);
      
      toast.success("Changes saved successfully ");
    } catch (err) {
      console.error("Error saving changes:", err);
      toast.error("Failed to save changes ");
    }
  };


  return {
    form,
    setForm,
    loading,
    handleChange,
    handleImageUpload,
    saveChanges,
    user,
    profileImage,
    fileInputRef,
    handleEditClick,
    addItem,
    removeItem,
    handleLinkChange,
    setUser,

  };
};
