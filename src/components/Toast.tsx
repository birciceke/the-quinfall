"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

type ToastType = "success" | "error";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-center gap-3 px-5 py-3.5 shadow-2xl backdrop-blur-sm ${type === "success"
                    ? "bg-green-900/90 border border-green-500/40 text-green-200"
                    : "bg-red-900/90 border border-red-500/40 text-red-200"
                }`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${type === "success" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                {type === "success" ? (
                    <FaCheck className="w-4 h-4 text-green-400" />
                ) : (
                    <FaTimes className="w-4 h-4 text-red-400" />
                )}
            </div>
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
            >
                <FaTimes className="w-3 h-3 opacity-60 hover:opacity-100" />
            </button>
        </motion.div>
    );
};

export default Toast;
