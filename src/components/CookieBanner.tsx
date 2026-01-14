"use client";

import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="fixed bottom-0 left-0 w-full z-100 bg-black/95 border-t border-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        <div className="flex-1 text-center md:text-left max-w-xl md:max-w-2xl">
                            <p className="text-gray-300 text-xs md:text-sm font-sans leading-relaxed">
                                We would like to point out that technically necessary cookies
                                are used to fulfill the main functions of our website. The use
                                of these cookies is a security and technical necessity for the
                                correct operation of our website.
                                <Link
                                    href="/privacy-policy"
                                    className="text-[#c9a858] ml-1 hover:text-[#aa8c46] transition-all duration-200"
                                >
                                    Click for Cookie Policy.
                                </Link>
                            </p>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 shrink-0 w-full sm:w-auto">
                            <button
                                onClick={handleDecline}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 border border-white/20 text-white text-xs md:text-sm font-serif cursor-pointer tracking-widest hover:bg-white/20 hover:border-white transition-all uppercase font-bold"
                            >
                                <FaTimes size={14} />
                                Decline
                            </button>

                            <button
                                onClick={handleAccept}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-[#c9a858] text-black text-xs md:text-sm font-serif cursor-pointer tracking-widest hover:bg-white transition-all uppercase font-bold"
                            >
                                <FaCheck size={14} />
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
