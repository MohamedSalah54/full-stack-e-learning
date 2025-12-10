import { getCategoryById } from "@/axios/services/categories/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
