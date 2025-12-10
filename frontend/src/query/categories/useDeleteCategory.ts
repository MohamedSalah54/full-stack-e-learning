import { deleteCategory } from "@/axios/services/categories/category";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
};
