import { create } from "zustand";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategoriesFiltered,
} from "@/axios/services/categories/category";

type Category = {
  _id: string;
  name: string;
  description?: string;
  parentCategory?: string | null;
};

interface CategoryStore {
  categories: Category[];
  parentCategories: Category[];           
  selectedCategory: Category | null;
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  addCategory: (data: { name: string; description?: string; parentCategory: string, iconKey?: string;  }) => Promise<void>;
  editCategory: (id: string, data: { name: string; description?: string; parentCategory?: string | null }) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  fetchCategoriesFiltered: (search?: string, parentCategory?: string) => Promise<void>;
  fetchParentCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  parentCategories: [],                    
  selectedCategory: null,
  isLoading: false,

  fetchCategoriesFiltered: async (search, parentCategory) => {
    set({ isLoading: true });
    try {
      const res = await getCategoriesFiltered({ search, parentCategory });
      set({ categories: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to fetch filtered categories", error);
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await getAllCategories();
      set({ categories: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to fetch categories", error);
    }
  },

  fetchCategoryById: async (id: string) => {
    set({ isLoading: true });
    try {
      const res = await getCategoryById(id);
      set({ selectedCategory: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to fetch category by id", error);
    }
  },

addCategory: async (data) => {
  set({ isLoading: true });
  try {
    const res = await createCategory(data);
    await useCategoryStore.getState().fetchCategories();
    await useCategoryStore.getState().fetchParentCategories();
  } catch (error: any) {
    console.error("Failed to add category", error.response?.data || error.message);
  } finally {
    set({ isLoading: false });
  }
},


editCategory: async (id, data) => {
  set({ isLoading: true });
  try {
    await updateCategory(id, data);
    await useCategoryStore.getState().fetchCategories();
    await useCategoryStore.getState().fetchParentCategories();
  } catch (error) {
    console.error("Failed to edit category", error);
  } finally {
    set({ isLoading: false });
  }
},

removeCategory: async (id) => {
  set({ isLoading: true });
  try {
    await deleteCategory(id);
    await useCategoryStore.getState().fetchCategories();
    await useCategoryStore.getState().fetchParentCategories();
  } catch (error) {
    console.error("Failed to delete category", error);
  } finally {
    set({ isLoading: false });
  }
},


fetchParentCategories: async () => {
  set({ isLoading: true });
  try {
    const res = await getAllCategories(); 
    const parentsIds = new Set(res.data
      .map(cat => cat.parentCategory)
      .filter(Boolean)); 

    const parentCats = res.data.filter(cat => parentsIds.has(cat._id));

    set({ parentCategories: parentCats, isLoading: false });
  } catch (error) {
    set({ isLoading: false });
    console.error("Failed to fetch parent categories", error);
  }
},

}));
