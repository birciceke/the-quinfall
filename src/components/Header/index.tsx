import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Globe } from "lucide-react";

import LOGO from "../../assets/images/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const languages = ["English", "Türkçe", "Русский", "Deutsch"];

  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        px-6 md:px-16 pt-14 md:pt-16
      "
    >
      <Link to="/" className="flex items-center gap-3">
        <img
          src={LOGO}
          alt="The Quinfall Logo"
          className="w-24 md:w-32 object-contain select-none"
          draggable={false}
        />
      </Link>

      <div className="flex items-center gap-4 text-white text-sm md:text-base">
        <div className="flex items-center gap-2">
          <button
            className="font-semibold cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/newsletter")}
          >
            Sign Up
          </button>

          <span className="opacity-50">|</span>

          <div
            className="relative flex flex-col"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="hover:opacity-80 transition flex items-center gap-1 cursor-pointer">
              <Globe size={18} className="mr-0.5" />
              {language}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 flex flex-col"
                >
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className={`cursor-pointer text-sm py-2 ${
                        language === lang
                          ? "text-[#c9a858]"
                          : "text-white hover:text-[#c9a858]"
                      }`}
                      onClick={() => {
                        setLanguage(lang);
                        setIsOpen(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
