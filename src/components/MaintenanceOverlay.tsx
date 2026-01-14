"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

import THE_QUINFALL_LOGO from "@/assets/images/logos/the-quinfall-logo.png";

interface MaintenanceOverlayProps {
    message?: string;
}

const MaintenanceOverlay = ({
    message = "We are currently performing scheduled maintenance. Please check back soon.",
}: MaintenanceOverlayProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] text-white flex flex-col items-center justify-center px-4 sm:px-8"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/backgrounds/bg-maintenance.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 max-w-lg w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="h-16 sm:h-20 mx-auto mb-8 sm:mb-12 relative"
                >
                    <Image
                        src={THE_QUINFALL_LOGO}
                        alt="The Quinfall Logo"
                        fill
                        className="object-contain"
                        draggable={false}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-6 sm:mb-8"
                >
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-widest mb-3 sm:mb-4">
                        Under Maintenance
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-4">
                        {message}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex items-center justify-center gap-4 sm:gap-6"
                >
                    <a
                        href="https://discord.com/invite/YxsfC7cBCu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/20 hover:border-[#5865F2] hover:bg-[#5865F2]/10 text-gray-400 hover:text-[#5865F2] transition-all duration-300"
                    >
                        <FaDiscord className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                        href="https://x.com/quinfall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/20 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 text-gray-400 hover:text-[#1DA1F2] transition-all duration-300"
                    >
                        <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                        href="https://www.youtube.com/c/TheQuinfall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/20 hover:border-[#FF0000] hover:bg-[#FF0000]/10 text-gray-400 hover:text-[#FF0000] transition-all duration-300"
                    >
                        <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/thequinfall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/20 hover:border-[#E4405F] hover:bg-[#E4405F]/10 text-gray-400 hover:text-[#E4405F] transition-all duration-300"
                    >
                        <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-6 sm:bottom-8 text-gray-500 text-[10px] sm:text-xs tracking-widest z-10"
            >
                © {new Date().getFullYear()} The Quinfall. All rights reserved.
            </motion.p>
        </motion.div>
    );
};

export default MaintenanceOverlay;
