"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    itemName?: string;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    itemName = "items",
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = (): (number | "ellipsis")[] => {
        const pages: (number | "ellipsis")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("ellipsis");
        }

        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
            <span className="hidden sm:block text-xs text-gray-500 tracking-wide">
                Showing <span className="text-[#c9a858]">{startItem}</span> to{" "}
                <span className="text-[#c9a858]">{endItem}</span> of{" "}
                <span className="text-[#c9a858]">{totalItems}</span> {itemName}
            </span>
            <span className="sm:hidden text-xs text-gray-500 tracking-wide">
                <span className="text-[#c9a858]">{startItem}-{endItem}</span> of{" "}
                <span className="text-[#c9a858]">{totalItems}</span>
            </span>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <FiChevronLeft className="w-4 h-4" />
                </button>

                {getVisiblePages().map((page, index) =>
                    page === "ellipsis" ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-gray-500 text-sm"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 text-xs font-bold tracking-wider transition-all ${currentPage === page
                                ? "bg-[#c9a858] text-black"
                                : "border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <FiChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
