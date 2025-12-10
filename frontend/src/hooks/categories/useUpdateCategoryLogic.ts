"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IconKey } from "@/constants/icons";
import { useCategoryStore } from "@/zustand/store/category";
import { useUpdateCategory } from "@/query/categories/useUpdateCategory";

export const useUpdateCategoryLogic = (category: any, onClose: () => void) => {
  const { categories, updateCategoryInState } = useCategoryStore();
  const updateMutation = useUpdateCategory();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    iconKey: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        parentCategory: category.parentCategory || "",
        iconKey: category.iconKey || "",
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      parentCategory: formData.parentCategory || null,
      iconKey: formData.iconKey || undefined,
    };

    try {
      const res = await updateMutation.mutateAsync({
        id: category._id,
        data: payload,
      });

      updateCategoryInState(res.data); // تحديث Zustand

      toast.success("Category has been updated!");
      onClose();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    categories,
    isLoading: updateMutation.isPending,
  };
};
