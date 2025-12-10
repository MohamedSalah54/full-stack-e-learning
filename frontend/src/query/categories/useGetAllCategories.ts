import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/axios/services/categories/category";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
