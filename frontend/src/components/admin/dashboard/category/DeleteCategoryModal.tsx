"use client";
import { Dialog } from "@headlessui/react";
import { useCategoryStore } from "@/zustand/store/category";
import { toast } from "react-toastify";

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  categoryId,
}: {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}) {
  const { removeCategory } = useCategoryStore();

  const handleDelete = async () => {
    try {
      await removeCategory(categoryId);
      onClose();
      toast.success("Category has been deleted!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          <Dialog.Title className="text-lg font-bold mb-4">
            Delete Category
          </Dialog.Title>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this category? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
