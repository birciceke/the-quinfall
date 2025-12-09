import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../store";
import { fetchNews } from "../../store/slices/news";
import { slugify } from "../../utils/slugify";

import Footer from "../../components/Footer";

import NEWS_SECTION_BG from "../../assets/images/news-section-bg.jpg";
import NEWS_BG from "../../assets/images/bg-test.jpg";

const News = ({ onScrollLockChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // 🔥 SCROLL LOCK KONTROLÜ
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setScrollProgress((prev) => {
        const next = Math.min(Math.max(prev + e.deltaY * 0.3, 0), 250);

        if (next > 5) {
          onScrollLockChange(false);
        } else {
          onScrollLockChange(true);
        }

        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onScrollLockChange]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load news! Please try again later.
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 text-lg">
        No news found.
      </div>
    );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div
        className="absolute top-0 left-0 w-full transition-transform duration-100 ease-linear"
        style={{
          transform: `translateY(-${scrollProgress}px)`,
        }}
      >
        <section
          id="news"
          className="relative h-screen w-full flex flex-col items-center justify-center"
        >
          <img
            src={NEWS_SECTION_BG}
            alt="News Section Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* HEADERS */}
          <div className="absolute top-28 z-20 text-center">
            <motion.h1
              className="font-bold text-white text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem]
              tracking-[0.15em] md:tracking-[0.2em] drop-shadow-[0_0_25px_rgba(0,0,0,1)]
              leading-[1.05] mb-4 whitespace-nowrap"
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
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-[#c9a858] tracking-wide mt-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.3, duration: 0.8, ease: "easeOut" },
              }}
            >
              Check out the latest news of The Quinfall
            </motion.p>
          </div>

          {/* NEWS GRID */}
          <div className="relative z-20 mt-60 w-[92%] max-w-7xl">
            <div className="grid grid-cols-3 grid-rows-2 gap-10">
              {data.slice(1, 6).map((news, index) => (
                <motion.div
                  key={news._id.toString()}
                  initial={{
                    opacity: 0,
                    y: 50,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 50, // düşük → yumuşak
                    damping: 18, // sönüm → fırt yapmayı engeller
                    delay: index * 0.1,
                  }}
                  className={`relative rounded-xs cursor-pointer overflow-hidden transition-all ${
                    index === 0 ? "col-span-1 row-span-2" : ""
                  }`}
                  onClick={() =>
                    navigate(`/news/${slugify(news.title)}-${news._id}`)
                  }
                >
                  <img
                    src={NEWS_BG}
                    alt="News Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="relative z-20 p-8 bg-black/40 h-full flex flex-col justify-between border border-[#c9a858]/30 rounded-xs">
                    <div>
                      <h3
                        className={`${
                          index === 0 ? "text-3xl mb-4" : "text-2xl mb-3"
                        } font-semibold text-[#c9a858]`}
                      >
                        {news.title}
                      </h3>
                      <p
                        className={`${
                          index === 0 ? "text-base" : "text-sm"
                        } text-gray-300 leading-snug`}
                      >
                        {news.content}
                      </p>
                    </div>
                    <p
                      className={`${
                        index === 0 ? "text-sm" : "text-xs"
                      } text-gray-400 mt-2`}
                    >
                      {news?.createdAt &&
                        new Date(news.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VIEW ALL BUTTON (hover büyüme yok) */}
          <motion.button
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="z-20 mt-12 px-10 py-4 border-2 text-[#c9a858] border-[#c9a858]/60 
            font-semibold rounded-xs tracking-wide hover:bg-black/60 transition-all cursor-pointer"
          >
            View All
          </motion.button>
        </section>

        <div className="relative z-30 w-full bg-black">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default News;
