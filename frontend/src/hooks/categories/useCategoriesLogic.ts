import { useGetAllCategories } from "@/query/categories/useGetAllCategories";
import { useGetCategoriesFiltered } from "@/query/categories/useGetCategoriesFiltered";
import { Category } from "@/types/category";
import { useCategoryStore } from "@/zustand/store/category";
import { useEffect, useState } from "react";

export const useCategoriesLogic = () => {
  const { parentCategories, fetchParentCategories } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [parentCategoryFilter, setParentCategoryFilter] = useState("");

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const filteredQuery = useGetCategoriesFiltered({
    search: searchTerm,
    parentCategory: parentCategoryFilter,
  });

  const allCategoriesQuery = useGetAllCategories();

  useEffect(() => {
    fetchParentCategories();
  }, [fetchParentCategories]);

  const categories: Category[] = filteredQuery.data?.data || [];
  const isLoading = filteredQuery.isLoading || allCategoriesQuery.isLoading;

  return {
    categories,
    parentCategories,
    isLoading,
    searchTerm,
    setSearchTerm,
    parentCategoryFilter,
    setParentCategoryFilter,
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    selectedCategory,
    setSelectedCategory,
  };
};
