"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { IconKey } from "@/constants/icons";
import { useCategoryStore } from "@/zustand/store/category";
import { useCreateCategory } from "@/query/categories/useCreateCategory";

export const useCreateCategoryLogic = (onClose: () => void) => {
  const { categories, addCategoryToState } = useCategoryStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    iconKey: "code" as IconKey,
  });

  const createCategoryMutation = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        parentCategory: formData.parentCategory || undefined,
        iconKey: formData.iconKey,
      };

      const res = await createCategoryMutation.mutateAsync(payload);

      addCategoryToState(res.data);

      toast.success("Category added successfully!");
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
    isLoading: createCategoryMutation.isPending,
  };
};
