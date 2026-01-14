"use client";

import { motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#c9a858]/20 blur-xl rounded-full" />
                    <ImSpinner8
                        size={48}
                        className="text-[#c9a858] animate-spin relative z-10"
                    />
                </div>

                <p className="font-serif text-xs tracking-widest text-gray-500">
                    Loading...
                </p>
            </motion.div>
        </div>
    );
};

export default GlobalLoader;
