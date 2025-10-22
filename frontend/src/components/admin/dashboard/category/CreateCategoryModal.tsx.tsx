"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useCategoryStore } from "@/zustand/store/category";
import { toast } from "react-toastify";
import { categoryIcons, IconKey } from "@/constants/icons";

export default function CreateCategoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addCategory, categories } = useCategoryStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    iconKey: "code" as IconKey, // Default icon
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      await addCategory({
        name: formData.name.trim(),
        description: formData.description.trim(),
        parentCategory: formData.parentCategory || undefined,
        iconKey: formData.iconKey,
      });

      onClose();
      toast.success("Category added successfully!");
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
            Add Category
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

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
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
