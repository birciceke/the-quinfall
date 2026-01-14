"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import type { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/news";
import { slugify } from "@/utils/slugify";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 9;

export default function AllNewsPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { data, isLoading, error } = useSelector(
        (state: RootState) => state.news
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const categories = ["all", ...new Set(data.map((news) => news.category))];

    const filteredNews = [...data]
        .filter((news) => {
            const matchesSearch = news.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" || news.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    const handleRetry = () => {
        dispatch(fetchNews());
    };

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
                    <div className="text-center space-y-2 max-w-md">
                        <h3 className="font-serif text-xl text-red-100 tracking-widest uppercase">
                            Connection Severed
                        </h3>
                        <p className="font-sans text-sm text-gray-400">
                            Failed to retrieve the chronicles. The mists are too thick.
                        </p>
                    </div>
                    <button
                        onClick={handleRetry}
                        className="flex items-center gap-2 px-6 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-200 uppercase text-xs font-bold tracking-widest transition-all cursor-pointer"
                    >
                        <FaSyncAlt className="w-4 h-4" />
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="min-h-screen text-white pt-32 pb-20"
                style={{
                    backgroundImage: "url('/images/backgrounds/bg-general.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/70" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="relative p-6 md:p-10 bg-black/40">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

                        <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16">
                            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-white">
                                <span className="text-[#c9a858]">All</span> Chronicles
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base font-sans">
                                Explore the complete archives of The Quinfall. Stay informed about
                                updates, events, and announcements from the realm.
                            </p>
                        </div>

                        {/* Decorative line */}
                        <div className="w-full flex items-center gap-4 mb-8 sm:mb-10 md:mb-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="w-2 h-2 rotate-45 border border-[#c9a858]/50 bg-[#c9a858]/10" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <div className="flex flex-col gap-4 mb-8 sm:mb-10 md:mb-12">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
                                <input
                                    type="search"
                                    id="chronicles-search"
                                    placeholder=" "
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="peer w-full bg-white/5 border border-white/20 focus:border-[#c9a858] pl-12 pr-4 py-3 text-sm outline-none transition-all duration-200"
                                />
                                <label
                                    htmlFor="chronicles-search"
                                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-sans pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:text-[#c9a858] peer-focus:bg-black peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#c9a858] peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-2"
                                >
                                    Search
                                </label>
                            </div>

                            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                                <div className="flex gap-2 min-w-max md:flex-wrap">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${selectedCategory === category
                                                ? "bg-[#c9a858] text-black"
                                                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {filteredNews.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                    {paginatedNews.map((news) => (
                                        <article
                                            key={news._id.toString()}
                                            onClick={() =>
                                                router.push(`/news/${slugify(news.title)}-${news._id}`)
                                            }
                                            className="cursor-pointer group bg-white/5 border border-white/10 hover:border-[#c9a858]/50 transition-colors duration-200 overflow-hidden flex flex-col"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={news.imageUrl}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                                                    draggable={false}
                                                />
                                                <div className="absolute top-4 left-4 bg-black/80 text-xs px-2 py-1 uppercase tracking-wider font-bold border-l-2 border-[#c9a858]">
                                                    {news.category}
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                                                    <FaCalendarAlt size={12} />
                                                    {new Date(news.createdAt).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </div>

                                                <h3 className="font-serif text-xl mb-3 group-hover:text-[#c9a858] transition-colors duration-200 line-clamp-2">
                                                    {news.title}
                                                </h3>

                                                <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                                    {news.content}
                                                </p>

                                                <span className="self-start text-xs uppercase tracking-widest text-white/70 group-hover:text-[#c9a858] transition-colors duration-200">
                                                    Read More
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    totalItems={filteredNews.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    itemName="chronicles"
                                />
                            </>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10">
                                <p className="text-gray-500">
                                    No chronicles found matching your search.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}
