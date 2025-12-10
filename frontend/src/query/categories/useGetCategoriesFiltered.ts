import { getCategoriesFiltered } from "@/axios/services/categories/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesFiltered = (params: {
  search?: string;
  parentCategory?: string;
}) => {
  return useQuery({
    queryKey: ["categories-filtered", params],
    queryFn: () => getCategoriesFiltered(params),
    placeholderData: (prev) => prev,
  });
};
