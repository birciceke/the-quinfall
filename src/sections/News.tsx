"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { ImSpinner8 } from "react-icons/im";

import type { AppDispatch, RootState } from "@/store/index";
import { fetchNews } from "@/store/slices/news";
import { slugify } from "@/utils/slugify";
import Footer from "@/components/Footer";

interface NewsProps {
    onScrollTop?: () => void;
}

const News = ({ onScrollTop }: NewsProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const containerRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useSelector(
        (state: RootState) => state.news
    );

    const handleRetry = () => {
        dispatch(fetchNews());
    };

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const isAtTop = container.scrollTop === 0;
            const isScrollingUp = e.deltaY < -50;

            if (isAtTop && isScrollingUp && onScrollTop) {
                e.preventDefault();
                onScrollTop();
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [onScrollTop]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black">
                <div className="w-full flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#c9a858]/20 blur-xl rounded-full" />
                        <ImSpinner8 className="w-12 h-12 text-[#c9a858] animate-spin relative z-10" />
                    </div>

                    <div className="text-center space-y-2">
                        <p className="font-serif text-lg text-white tracking-[0.2em] animate-pulse uppercase">
                            Retrieving Chronicles
                        </p>
                        <p className="font-sans text-xs text-gray-500 tracking-wider">
                            Communing with The Quinfall archives...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
                    <div className="text-center space-y-2 max-w-md">
                        <h3 className="font-serif text-xl text-red-100 tracking-widest uppercase">
                            Connection Severed
                        </h3>
                        <p className="font-sans text-sm text-gray-400">
                            Failed to retrieve the latest chronicles from the realm. The mists
                            are too thick.
                        </p>
                    </div>

                    <button
                        onClick={handleRetry}
                        className="flex items-center gap-2 px-6 py-3
              bg-red-900/20 hover:bg-red-900/40
              border border-red-500/30
              text-red-200 uppercase text-xs
              font-bold tracking-widest
              transition-all group cursor-pointer"
                    >
                        <FaSyncAlt className="w-4 h-4" />
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="h-screen w-full overflow-y-auto overflow-x-hidden bg-black text-white scrollbar-hide"
        >
            <section className="relative min-h-screen w-full flex flex-col items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: 0 }}
                >
                    <source src="/videos/overlay.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" style={{ zIndex: 1 }} />

                <div className="absolute top-20 sm:top-24 md:top-28 z-20 text-center px-4">
                    <motion.h1
                        className="font-bold text-white text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[6rem]
              tracking-[0.15em] md:tracking-[0.2em] drop-shadow-[0_0_25px_rgba(0,0,0,1)] mb-2 sm:mb-4"
                    >
                        {"NEWS".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { duration: 1.2, delay: Math.random() * 1.2 },
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-2xl text-[#c9a858] px-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 1.3, duration: 0.8 },
                        }}
                    >
                        Check out the latest news of The Quinfall
                    </motion.p>
                </div>

                <div className="relative z-20 mt-60 sm:mt-80 md:mt-100 w-[95%] sm:w-[92%] max-w-7xl pb-12 sm:pb-16 md:pb-20">
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => router.push("/news")}
                            className="group flex items-center gap-2 text-[#c9a858] hover:text-white transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
                        >
                            View All
                            <HiOutlineArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...data]
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime()
                            )
                            .slice(0, 3)
                            .map((news) => (
                                <article
                                    key={news._id.toString()}
                                    onClick={() =>
                                        router.push(`/news/${slugify(news.title)}-${news._id}`)
                                    }
                                    className="cursor-pointer group bg-white/5 border border-white/10
                  hover:border-[#c9a858]/50 transition-all duration-200
                  hover:-translate-y-2 overflow-hidden flex flex-col"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={news.imageUrl}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110"
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

                                        <h3 className="font-serif text-xl mb-3 group-hover:text-[#c9a858] transition-all duration-200 line-clamp-2">
                                            {news.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                            {news.content}
                                        </p>

                                        <span className="self-start text-xs uppercase tracking-widest text-white/70 group-hover:text-[#c9a858] transition-all duration-200">
                                            Read More
                                        </span>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default News;
