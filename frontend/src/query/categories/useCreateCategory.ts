import { createCategory } from './../../axios/services/categories/category';
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: { 
      name: string; 
      description?: string; 
      parentCategory?: string;
      iconKey?: string;
    }) => createCategory(data),
  });
};

