"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { categoryIcons } from "@/constants/icons";
import { useSubCategoriesLogic } from "@/hooks/categories/useSubCategoriesLogic";
import { Category } from "@/types/category";

export default function SubCategoriesPage() {
  const { subCategories, goToCourses } = useSubCategoriesLogic();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Tracks</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover curated learning paths and business tracks tailored to help
          you achieve your goals.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {subCategories.map((cat: Category) => {
            const Icon = cat.iconKey ? categoryIcons[cat.iconKey] : null;
            return (
              <motion.div
                key={cat._id}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => goToCourses(cat._id)}
              >
                <Card
                  className="h-40 w-65 flex items-center justify-center text-center relative overflow-hidden transition-all duration-300 group"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 w-full h-full">
                    <div className="flex flex-col items-center justify-center h-full transition-opacity duration-300 group-hover:opacity-0">
                      {Icon && <Icon size={30} />}
                      <Typography
                        variant="h6"
                        className="mt-2 font-semibold text-sm"
                      >
                        {cat.name}
                      </Typography>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-gray-800">
                      <Typography
                        variant="body2"
                        className="text-white text-center text-xl"
                      >
                        {cat.description || "No description available"}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
