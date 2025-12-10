"use client";

import { toast } from "react-toastify";
import { useDeleteCategory } from "@/query/categories/useDeleteCategory";
import { useCategoryStore } from "@/zustand/store/category";

export const useDeleteCategoryLogic = (onClose: () => void, categoryId: string) => {
  const { removeCategoryFromState } = useCategoryStore(); // هنضيفها بعد شوية

  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async () => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);

      removeCategoryFromState(categoryId);

      toast.success("Category has been deleted!");
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return { handleDelete, isLoading: deleteCategoryMutation.isPending };
};
