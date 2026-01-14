"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";

import type { News } from "@/types/news";

import DashboardNewsCard from "./DashboardNewsCard";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 5;

interface DashboardNewsProps {
  news: News[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  onEdit: (item: News) => void;
  onDelete: (item: News) => void;
  isLoading?: boolean;
  error?: string | null;
}

const DashboardNews = ({
  news,
  searchQuery,
  onSearchChange,
  onCreate,
  onEdit,
  onDelete,
  isLoading = false,
  error,
}: DashboardNewsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [news.length, currentPage, totalPages]);

  return (
    <motion.section
      key="news"
      initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-400 text-xs sm:text-sm">
          Managing the public chronicles of The Quinfall.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative bg-white/5 border border-white/10 focus-within:border-[#c9a858] px-3 py-2.5 flex items-center gap-2">
            <FiSearch className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="search"
              id="dashboard-search"
              className="peer bg-transparent outline-none text-xs w-full sm:w-48"
              placeholder=" "
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <label
              htmlFor="dashboard-search"
              className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-sans pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:left-3 peer-focus:text-[10px] peer-focus:text-[#c9a858] peer-focus:bg-[#050505] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#c9a858] peer-[:not(:placeholder-shown)]:bg-[#050505] peer-[:not(:placeholder-shown)]:px-1"
            >
              Search
            </label>
          </div>

          <button
            onClick={onCreate}
            className="flex items-center justify-center gap-2 bg-[#c9a858] text-black px-4 sm:px-6 py-2.5 font-bold uppercase text-xs tracking-widest cursor-pointer hover:bg-white transition-all"
          >
            <FiPlus /> <span className="hidden sm:inline">Add</span> Chronicle
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <ImSpinner8 className="w-8 h-8 text-[#c9a858] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-10 border border-dashed border-red-500/20 text-red-400">
            {error}
          </div>
        ) : news.length > 0 ? (
          paginatedNews.map((item) => (
            <DashboardNewsCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="text-center py-10 border border-dashed border-white/10 text-gray-500">
            No chronicles found matching{" "}
            <span className="text-[#c9a858]">"{searchQuery}"</span>.
          </div>
        )}
      </div>

      {!isLoading && !error && news.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={news.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="chronicles"
        />
      )}
    </motion.section>
  );
};

export default DashboardNews;
