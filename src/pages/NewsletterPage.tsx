import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";

import LOGO from "../assets/images/logo.png";
import MAIN_BG from "../assets/images/main-bg.jpg";

import Footer from "../components/Footer";

const NewsletterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address!",
      });
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/newsletter`, { email });

      if (res.status !== 200 && res.status !== 201)
        throw new Error("Subscription failed!");

      setMessage({ type: "success", text: "Subscribed successfully!" });
      setEmail("");
    } catch (err) {
      setMessage({
        type: "error",
        text: "Subscription failed! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
        <img
          src={MAIN_BG}
          alt="Main Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-lg sm:max-w-xl mx-auto px-8 bg-black/60 rounded-xs py-10 shadow-[0_0_40px_rgba(0, 0, 0, 0.7)] border border-[#c9a858]/30"
        >
          <img
            src={LOGO}
            alt="Logo"
            className="mx-auto w-32 mb-6 opacity-95 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-4 text-[#c9a858] drop-shadow-[0_0_20px_rgba(0, 0, 0, 0.8)]">
            Newsletter Sign Up
          </h1>

          <p className="text-lg text-gray-200 mb-6">
            Sign up for exclusive access to upcoming events!
          </p>

          <form
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Please enter your email."
              className="px-4 py-3 w-full sm:w-80 rounded-xs bg-[#0b0b0b]/80 border border-[#c9a858]/60 text-white focus:outline-none focus:border-[#c9a858] placeholder-gray-500 transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#b89645" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#c9a858] text-black font-semibold rounded-xs tracking-wider shadow-md cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Subscribe"}
            </motion.button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm max-w-md mx-auto leading-relaxed ${
                message.type === "success" ? "text-green-400" : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <p className="mt-6 text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            By signing up to receive our newsletter, you agree to our{" "}
            <span className="text-[#c9a858] hover:opacity-80 cursor-pointer transition">
              Privacy Policy
            </span>
            .
          </p>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default NewsletterPage;
