import { useState } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    visibleItems,
    handlePageChange,
  };
};
