"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    FaDiscord,
    FaXTwitter,
    FaYoutube,
    FaGlobe,
    FaInstagram,
} from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

import THE_QUINFALL_LOGO from "@/assets/images/logos/the-quinfall-logo.png";

interface HeaderProps {
    onOpenNewsletter?: () => void;
}

const Header = ({ onOpenNewsletter }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const handleNewsletterClick = () => {
        setMobileMenuOpen(false);
        if (onOpenNewsletter) {
            onOpenNewsletter();
        }
    };

    const socialLinks = [
        { href: "https://discord.com/invite/YxsfC7cBCu", icon: FaDiscord, hoverColor: "hover:text-[#5865F2]", label: "Discord" },
        { href: "https://www.instagram.com/thequinfall", icon: FaInstagram, hoverColor: "hover:text-[#E4405F]", label: "Instagram" },
        { href: "https://x.com/quinfall", icon: FaXTwitter, hoverColor: "hover:text-[#1DA1F2]", label: "X (Twitter)" },
        { href: "https://www.youtube.com/c/TheQuinfall", icon: FaYoutube, hoverColor: "hover:text-[#FF0000]", label: "YouTube" },
    ];

    return (
        <>
            <motion.header
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="
          fixed top-0 left-0 w-full z-50
          flex items-center justify-between
          px-6 sm:px-10 md:px-16 lg:px-20
          pt-6 sm:pt-10 md:pt-20
        "
            >
                <Link href="/" className="flex items-center gap-4">
                    <Image
                        src={THE_QUINFALL_LOGO}
                        alt="The Quinfall Logo"
                        className="w-24 sm:w-32 md:w-40 lg:w-44 object-contain select-none"
                        draggable={false}
                        priority
                    />
                </Link>

                <div className="hidden md:flex items-center gap-6 text-base md:text-lg">
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ href, icon: Icon, hoverColor, label }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`cursor-pointer p-2.5 rounded-full text-white transition-all duration-200 ${hoverColor} hover:bg-white/10`}
                            >
                                <Icon size={22} />
                            </a>
                        ))}
                    </div>

                    <motion.button
                        onClick={handleNewsletterClick}
                        className="
              relative px-6 py-3
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
                            className="cursor-pointer p-2.5 rounded-full hover:bg-white/10 transition-all duration-200 text-white"
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
                                            className={`cursor-pointer transition-all duration-200 ${language === lang ? "text-[#c9a858]" : "hover:text-[#c9a858]"
                                                }`}
                                        >
                                            {lang}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    aria-label="Open menu"
                >
                    <HiOutlineMenuAlt3 size={28} />
                </button>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col"
                        >
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <IoClose size={28} />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
                                <button
                                    onClick={handleNewsletterClick}
                                    className="
                    w-full py-4 mb-8
                    bg-[#c9a858] text-black
                    font-bold tracking-widest uppercase text-sm
                    flex items-center justify-center gap-3
                    hover:bg-white transition-all cursor-pointer
                  "
                                >
                                    <MdOutlineMail size={20} />
                                    Newsletter
                                </button>

                                <div className="mb-8">
                                    <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">
                                        Language
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                className={`py-3 px-4 text-sm font-medium transition-all cursor-pointer border ${language === lang
                                                    ? "bg-[#c9a858]/20 text-[#c9a858] border-[#c9a858]/50"
                                                    : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">
                                        Follow Us
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
                                            <a
                                                key={href}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white text-sm transition-all ${hoverColor} hover:border-white/30`}
                                            >
                                                <Icon size={18} />
                                                <span className="font-medium">{label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
