"use client";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useCategoryStore } from "@/zustand/store/category";
import { toast } from "react-toastify";
import { categoryIcons, IconKey } from "@/constants/icons"; // 👈 ملف الأيقونات

export default function EditCategoryModal({
  isOpen,
  onClose,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  category: any;
}) {
  const { editCategory, categories } = useCategoryStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    iconKey: "", // 👈 إضافة الأيقونة
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        parentCategory: category.parentCategory || "",
        iconKey: category.iconKey || "", // 👈 تحميل الأيقونة الحالية لو موجودة
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      parentCategory: formData.parentCategory.trim() || null,
      iconKey: formData.iconKey || undefined, // 👈 إرسال الأيقونة
    };

    try {
      await editCategory(category._id, payload);
      onClose();
      toast.success("Category has been updated!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <Dialog.Title className="text-lg font-bold mb-4">
            Edit Category
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
            {/* Description */}
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            {/* Parent Category */}
            <select
              value={formData.parentCategory}
              onChange={(e) =>
                setFormData({ ...formData, parentCategory: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">No Parent</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Icons Grid */}
           {/* اختيار أيقونة */}
<div>
  <p className="mb-2 font-semibold">Choose an icon:</p>
  <div className="grid grid-cols-4 gap-2">
    {Object.entries(categoryIcons).map(([key, Icon]) => (
      <button
        type="button"
        key={key}
        onClick={() =>
          setFormData({ ...formData, iconKey: key as IconKey })
        }
        className={`p-2 border rounded flex items-center justify-center hover:bg-gray-100 transition ${
          formData.iconKey === key
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300"
        }`}
      >
        <Icon size={18} />
      </button>
    ))}
  </div>
</div>


            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
