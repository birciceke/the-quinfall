"use client";

import { FiTrash2, FiEdit3 } from "react-icons/fi";

import type { News } from "@/types/news";

interface DashboardNewsCardProps {
  item: News;
  onEdit: (item: News) => void;
  onDelete: (item: News) => void;
}

const DashboardNewsCard = ({
  item,
  onEdit,
  onDelete,
}: DashboardNewsCardProps) => {
  return (
    <div className="bg-white/5 border border-white/10 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
      <img
        src={item.imageUrl}
        alt={item.title}
        draggable="false"
        className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded"
      />

      <div className="flex-1 w-full">
        <span className="text-[10px] text-[#c9a858] uppercase tracking-widest font-bold block">
          {item.category}
        </span>

        <h4 className="font-serif text-base sm:text-lg font-bold line-clamp-1">{item.title}</h4>

        <p className="text-xs text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={() => onEdit(item)}
          className="p-2 sm:p-2.5 rounded-full hover:text-[#c9a858] hover:bg-white/10 transition cursor-pointer"
        >
          <FiEdit3 size={18} className="sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => onDelete(item)}
          className="p-2 sm:p-2.5 rounded-full hover:text-red-500 hover:bg-white/10 transition cursor-pointer"
        >
          <FiTrash2 size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default DashboardNewsCard;
