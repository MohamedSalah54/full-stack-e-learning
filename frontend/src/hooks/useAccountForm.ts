"use client";
import { useProfile } from "@/hooks/useProfile";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateUserData } from "@/types/user";
import { usePasswordStore } from "@/zustand/store/profileStore";
import { toast } from "react-toastify";

export const useAccountForm = () => {
  const { form, saveChanges, user, setUser } = useProfile();
  const { changeUserPassword } = usePasswordStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<UpdateUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      qualifications: [],
      skills: [],
      profilePicture: { secure_url: "", public_id: "" },
      links: { youtube: "", facebook: "", linkedin: "", x: "" },
    },
  });

  useEffect(() => {
    if (form?.firstName) {
      reset({
        firstName: form.firstName || "",
        lastName: form.lastName || "",
        email: form.email || "",
        phone: form.phone || "",
        bio: form.bio || "",
        qualifications: form.qualifications ?? [],
        skills: form.skills ?? [],
        profilePicture: form.profilePicture || {
          secure_url: "",
          public_id: "",
        },
        links: form.links || {
          youtube: "",
          facebook: "",
          linkedin: "",
          x: "",
        },
      });
    }
  }, [form, reset]);

  const onSubmitForm = async (data: UpdateUserData) => {
    const updatedData: Partial<UpdateUserData> = {};

    Object.keys(dirtyFields).forEach((key) => {
      const value = data[key as keyof UpdateUserData];
      if (value !== undefined) {
        updatedData[key as keyof UpdateUserData] = value as any;
      }
    });

    if (updatedData.links) {
      const { youtube, facebook, linkedin, x } = updatedData.links;
      updatedData.links = { youtube, facebook, linkedin, x };
    }

    if (updatedData.profilePicture) {
      const { secure_url, public_id } = updatedData.profilePicture;
      updatedData.profilePicture = { secure_url, public_id };
    }

    if (user?.id) {
      await saveChanges(user.id, updatedData as UpdateUserData);

      setUser({
        ...user,
        ...updatedData,
      });
    }
  };

  const changePass = async () => {
    const currentPass = watch("currentPass") as string;
    const newPass = watch("newPass") as string;
    const confirmPass = watch("confirmPass") as string;

    if (!user?.id) return;

    if (newPass !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await changeUserPassword(user.id, {
        currentPassword: currentPass,
        newPassword: newPass,
        confirmNewPassword: confirmPass,
      });

      toast.success("Password updated successfully!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    dirtyFields,
    form,
    user,
    saveChanges,
    setUser,
    onSubmitForm,
    control,
    changePass,
    watch,
  };
};
