import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FaDiscord, FaXTwitter, FaYoutube, FaGlobe } from "react-icons/fa6";

import THE_QUINFALL_LOGO from "../assets/images/logos/the-quinfall-logo.png";

interface HeaderProps {
  onOpenNewsletter: () => void;
}

const Header = ({ onOpenNewsletter }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const languages = ["English", "Türkçe", "Русский", "Deutsch"];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        px-8 md:px-20
        pt-16 md:pt-20
      "
    >
      <Link to="/" className="flex items-center gap-4">
        <img
          src={THE_QUINFALL_LOGO}
          alt="The Quinfall Logo"
          className="w-32 md:w-40 lg:w-44 object-contain select-none"
          draggable={false}
        />
      </Link>

      <div className="flex items-center gap-6 text-base md:text-lg">
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/N8TKtwJV"
            target="_blank"
            rel="noopener noreferrer"
            className="
        cursor-pointer p-2.5 rounded-full
        text-white
        transition-all duration-200
        hover:text-[#5865F2]
        hover:bg-white/10
      "
          >
            <FaDiscord size={22} />
          </a>

          <a
            href="https://x.com/quinfall"
            target="_blank"
            rel="noopener noreferrer"
            className="
    cursor-pointer p-2.5 rounded-full
    text-white
    transition-all duration-200
    hover:text-[#1DA1F2]
    hover:bg-white/10
  "
          >
            <FaXTwitter size={22} />
          </a>

          <a
            href="https://www.youtube.com/c/TheQuinfall"
            target="_blank"
            rel="noopener noreferrer"
            className="
        cursor-pointer p-2.5 rounded-full
        text-white
        transition-all duration-200
        hover:text-[#FF0000]
        hover:bg-white/10
      "
          >
            <FaYoutube size={22} />
          </a>
        </div>

        <motion.button
          onClick={onOpenNewsletter}
          className="
    relative
    px-6 py-3
    font-semibold tracking-wide
    text-white
    border border-white/20
    cursor-pointer
    transition-all duration-200
    hover:text-[#c9a858]
    hover:border-[#c9a858]
    [clip-path:polygon(18px_0%,100%_0%,100%_calc(100%-18px),calc(100%-18px)_100%,0%_100%,0%_18px)]
  "
        >
          Newsletter Subscription
        </motion.button>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="
        cursor-pointer p-2.5 rounded-full
        hover:bg-white/10
        transition-all duration-200
        text-white
      "
          >
            <FaGlobe size={22} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="
            absolute left-1/2 top-full mt-6
            -translate-x-1/2
            min-w-[150px]
            flex flex-col items-center gap-4
            bg-black/20 backdrop-blur-2xl
            px-4 py-3
            text-sm
            border border-white/10
            text-white
            [clip-path:polygon(18px_0%,100%_0%,100%_calc(100%-18px),calc(100%-18px)_100%,0%_100%,0%_18px)]
          "
              >
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`
                cursor-pointer transition-all duration-200
                ${language === lang ? "text-[#c9a858]" : "hover:text-[#c9a858]"}
              `}
                  >
                    {lang}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
