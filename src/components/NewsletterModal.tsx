import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";
import axios, { isAxiosError } from "axios";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await axios.post(`${API_URL}/subscription`, { email });

      if (res.status !== 200 && res.status !== 201)
        throw new Error("Subscription failed!");

      setStatus("success");

      setTimeout(() => {
        onClose();
        setStatus("idle");
        setEmail("");
      }, 3000);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data?.message || "Subscription failed!");
      } else {
        setErrorMessage("Subscription failed!");
      }
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, filter: "blur(14px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(14px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(197,160,89,0.1)]"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes size={22} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">
                  Newsletter Subscription
                </h2>
                <p className="font-sans text-gray-400 text-sm md:text-base">
                  Subscribe for exclusive access to upcoming events!
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  className="w-full py-8 flex flex-col items-center"
                >
                  <FaCheck size={44} className="text-[#c9a858] mb-2" />
                  <p className="text-white font-serif tracking-wider">
                    You have successfully subscribed to the newsletter!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your e-mail address."
                    className="w-full bg-white/5 border border-white/20 px-4 py-4 text-white placeholder-gray-500 outline-none focus:border-[#c9a858] transition-all duration-200 font-sans"
                    required
                    disabled={status === "submitting"}
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-[#c9a858] text-black font-serif font-bold tracking-widest uppercase py-4 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {status === "submitting"
                      ? "Processing..."
                      : "Subscribe Now"}
                    <FaArrowRight />
                  </button>

                  {status === "error" && errorMessage && (
                    <p className="text-sm text-red-500 font-sans text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}

              <p className="text-[10px] md:text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed border-t border-white/10 pt-6">
                By signing up to receive our newsletter, you agree to our{" "}
                <a
                  href="/"
                  className="text-[#c9a858] hover:text-[#aa8c46] transition-all duration-200"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
