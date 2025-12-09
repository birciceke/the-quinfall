import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import type { AppDispatch, RootState } from "../store";
import { fetchNewsById } from "../store/slices/news";

import MAIN_BG from "../assets/images/main-bg.jpg";
import BG_TEST from "../assets/images/bg-test.jpg";

import Footer from "../components/Footer";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const _id = slug?.split("-").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentData, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (_id) dispatch(fetchNewsById(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    if (!isLoading && error) {
      navigate("/");
    }
  }, [isLoading, error, navigate]);

  return (
    <>
      <section className="relative min-h-screen w-full text-white flex items-center justify-center overflow-hidden">
        <img
          src={MAIN_BG}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {isLoading && (
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-[#c9a858]"
            >
              Loading News...
            </motion.div>
          </div>
        )}

        {!isLoading && error && (
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-2xl font-semibold"
            >
              News not found.
            </motion.div>
          </div>
        )}

        {!isLoading && !error && currentData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto p-0 rounded-xs shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-[#c9a858]/30 overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={BG_TEST}
                alt="Content Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative px-6 py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#c9a858] mb-6 text-center">
                {currentData.title}
              </h1>

              <p className="text-sm text-gray-400 text-center mb-10">
                {new Date(currentData.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
                {currentData.content}
              </div>

              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#b89645" }}
                  className="px-6 py-3 bg-[#c9a858] text-black font-semibold rounded-xs tracking-wider shadow-md cursor-pointer transition"
                  onClick={() => navigate("/")}
                >
                  Back to News
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default NewsDetailPage;
