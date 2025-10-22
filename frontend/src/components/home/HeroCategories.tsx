'use client';

import { heroCategories } from "@/constants";
import { useAuthStore } from "@/zustand/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroCategories = () => {
  const categories = heroCategories;
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleClick = () => {
    if (!user) return;

    if (user.role === "admin") {
      router.push("/admin/dashboard/categories/");
    } else {
      router.push("/categories");
    }
  };

  const buttonLabel =
    user?.role === "admin" ? "Create New Category" : "Search All Categories";

  return (
    <section className="w-full py-16 px-4 bg-white">
      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow transition min-h-[350px] hover:bg-gray-100 cursor-pointer"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              className="w-full h-[250px] object-contain bg-white"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                {"⭐".repeat(Math.round(cat.rating))}
                <span className="text-xs text-gray-500 ml-2">
                  ({cat.reviews} reviews)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Button */}
      {user && (
        <div className="flex justify-start mt-10 max-w-7xl mx-auto">
          <button
            onClick={handleClick}
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition cursor-pointer"
          >
            {buttonLabel}
          </button>
        </div>
      )}

      {/* Heading + Span */}
      <div className="text-left mt-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All the skills you need in one place
        </h1>
        <span className="text-gray-600 text-base">
          From critical skills to technical topics, AcademyX supports your professional development.
        </span>
      </div>
    </section>
  );
};

export default HeroCategories;
