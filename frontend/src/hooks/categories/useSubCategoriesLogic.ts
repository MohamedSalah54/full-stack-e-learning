import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCategoryStore } from "@/zustand/store/category";
import { Category } from "@/types/category";

export const useSubCategoriesLogic = () => {
  const router = useRouter();
  const { id } = useParams();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const subCategories: Category[] = useMemo(
    () => categories.filter((cat) => cat.parentCategory === id),
    [categories, id]
  );

  const goToCourses = (subCategoryId: string) => {
    router.push(`/categories/${subCategoryId}/coursesOfTrack`);
  };

  return {
    subCategories,
    goToCourses,
  };
};
