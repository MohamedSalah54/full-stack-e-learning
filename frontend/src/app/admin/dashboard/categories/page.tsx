"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import EditCategoryModal from "@/components/admin/dashboard/category/EditCategoryModal";
import DeleteCategoryModal from "@/components/admin/dashboard/category/DeleteCategoryModal";
import { useCategoriesLogic } from "@/hooks/categories/useCategoriesLogic";
import CreateCategoryModal from "@/components/admin/dashboard/category/CreateCategoryModal.tsx";

export default function CategoriesPage() {
  const {
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
  } = useCategoriesLogic();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          📚 Manage All Your Categories In One Place
        </h1>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none "
          />

          <select
            value={parentCategoryFilter}
            onChange={(e) => setParentCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500
                       text-gray-700 hover:border-gray-800 transition duration-200 ease-in-out cursor-pointer"
          >
            <option value="">All Parents</option>
            {parentCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition duration-200"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden min-h-[300px]">
          <div className="overflow-y-auto max-h-[500px]">
            {categories.length === 0 && searchTerm.trim() !== "" ? (
              <div className="flex items-center justify-center h-48 text-gray-500 italic text-lg">
                😕 No categories found matching "
                <span className="font-semibold">{searchTerm}</span>"
              </div>
            ) : (
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300">Name</th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Description
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300">
                      Parent
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{cat.name}</td>
                      <td className="px-6 py-4">{cat.description || "—"}</td>
                      <td className="px-6 py-4">
                        {cat.parentCategory
                          ? categories.find((c) => c._id === cat.parentCategory)
                              ?.name || "—"
                          : "—"}
                      </td>
                      <td className="px-6 py-4 flex gap-3 justify-end">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setOpenEdit(true);
                          }}
                          className="text-blue-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setOpenDelete(true);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      <CreateCategoryModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      />
      <EditCategoryModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        category={selectedCategory}
      />
      {selectedCategory && (
        <DeleteCategoryModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          categoryId={selectedCategory._id}
        />
      )}
    </div>
  );
}
