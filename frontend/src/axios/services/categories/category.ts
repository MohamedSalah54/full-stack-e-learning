import API from "../../API/api";

export const createCategory = (data: { 
  name: string; 
  description?: string;
  parentCategory?: string;
  iconKey?: string;
}) =>
  API.post("/categories/create", data);


export const getAllCategories = () =>
  API.get("/categories");

export const getCategoryById = (id: string) =>
  API.get(`/categories/${id}`);

export const updateCategory = (id: string, data: { name: string; description?: string }) =>
  API.put(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  API.delete(`/categories/${id}`);

export const getCategoriesFiltered = (params: { search?: string; parentCategory?: string }) =>
  API.get("/categories", { params });

