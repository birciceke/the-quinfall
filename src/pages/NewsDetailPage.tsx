import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaLink, FaArrowLeft } from "react-icons/fa";

import type { AppDispatch, RootState } from "../store/index";
import { fetchNewsById } from "../store/slices/news";

import ErrorPage from "./ErrorPage";

const NewsDetailPage = () => {
  const { slug } = useParams();

  const newsId = slug?.split("-").pop();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [copied, setCopied] = useState(false);

  const { currentData, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (newsId) dispatch(fetchNewsById(newsId));
  }, [dispatch, newsId]);

  if (isLoading) return null;

  if (error || !currentData) {
    return <ErrorPage />;
  }

  return (
    <section className="relative min-h-screen w-full bg-black text-white flex items-center">
      {!isLoading && !error && currentData && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative max-w-5xl mx-auto my-12 bg-linear-to-t from-black via-black/80 to-transparent md:border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent z-10" />
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
            <img
              src={currentData.imageUrl}
              alt={currentData.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-6 inset-x-0 z-20">
              <div className="max-w-3xl mx-auto px-5 md:px-8">
                <span className="bg-[#c9a858] text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                  {currentData.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
                  {currentData.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="p-5 md:p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <FaCalendarAlt className="text-[#c9a858]" size={14} />
                  {new Date(currentData.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <FaLink />
                  </button>
                  {copied && (
                    <span className="text-xs text-[#c9a858] tracking-wide">
                      Copied!
                    </span>
                  )}
                </div>
              </div>

              <div className="max-w-none font-sans text-gray-300">
                <div className="whitespace-pre-line">{currentData.content}</div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3 px-8 py-3 border border-white/30 hover:border-[#c9a858] hover:text-[#c9a858] text-white transition-all uppercase tracking-widest text-sm font-bold cursor-pointer group"
                >
                  <FaArrowLeft />
                  Back to News
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default NewsDetailPage;
