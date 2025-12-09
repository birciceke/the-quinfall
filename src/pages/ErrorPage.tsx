import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import ERROR_BG from "../assets/images/404-bg.jpg";
import ERROR_ICON from "../assets/images/404-ico.png";

import Footer from "../components/Footer";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen w-full text-white flex items-center justify-center overflow-hidden">
        {/* Background */}
        <img
          src={ERROR_BG}
          alt="404 Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center px-6 py-12 bg-black/60 rounded-xs shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-[#c9a858]/30"
        >
          <motion.img
            src={ERROR_ICON}
            alt="404 Icon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto mb-6 w-40 h-40 object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]"
          />

          <h1 className="text-5xl md:text-6xl font-bold tracking-wider text-[#c9a858] drop-shadow-lg uppercase">
            404 Not Found!
          </h1>

          <p className="text-gray-300 text-lg mt-4 tracking-wide">
            Uhm.. Something's wrong...
          </p>
          <p className="text-gray-400 text-base mt-1">
            Page not found! You can go to the home page if you wish.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#b89645" }}
            className="mt-8 px-8 py-3 bg-[#c9a858] text-black font-semibold rounded-xs tracking-wider shadow-md cursor-pointer transition"
            onClick={() => navigate("/")}
          >
            Go to Home
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default ErrorPage;
