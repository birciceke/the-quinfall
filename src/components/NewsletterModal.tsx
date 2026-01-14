"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { createSubscription } from "@/store/slices/subscription";
import type { AppDispatch, RootState } from "@/store";

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.subscription);

    const [visible, setVisible] = useState(isOpen);
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    useEffect(() => {
        if (isOpen) setVisible(true);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    useEffect(() => {
        if (!visible) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeWithAnimation();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [visible]);

    const closeWithAnimation = () => {
        setVisible(false);
        setTimeout(onClose, 600);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setMessage(null);

        try {
            await dispatch(createSubscription({ email })).unwrap();

            setIsSuccess(true);
            setMessage({
                text: "You have successfully subscribed to the newsletter!",
                type: "success",
            });

            setTimeout(() => {
                closeWithAnimation();
                setIsSuccess(false);
                setEmail("");
                setMessage(null);
            }, 3000);
        } catch (err) {
            const errorMessage = (err as string) || "Subscription failed!";
            setMessage({ text: errorMessage, type: "error" });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={closeWithAnimation}
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
                            onClick={closeWithAnimation}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                        >
                            <FiX size={22} />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="space-y-2">
                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">
                                    <span className="text-[#c9a858] ">Newsletter</span>{" "}
                                    Subscription
                                </h2>
                                <p className="font-sans text-gray-400 text-sm md:text-base">
                                    Subscribe for exclusive access to upcoming events!
                                </p>
                            </div>

                            {/* Decorative line */}
                            <div className="w-full flex items-center gap-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <div className="w-2 h-2 rotate-45 border border-[#c9a858]/50 bg-[#c9a858]/10" />
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>

                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    className="w-full py-8 flex flex-col items-center"
                                >
                                    <FaCheck size={44} className="text-[#c9a858] mb-2" />
                                    <p className="text-white font-serif tracking-wider">
                                        {message?.text}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="w-full space-y-6">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="newsletter-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder=" "
                                            className="peer w-full bg-white/5 border border-white/20 px-4 py-4 text-white outline-none focus:border-[#c9a858] transition-all duration-200 font-sans"
                                            required
                                            disabled={isLoading}
                                        />
                                        <label
                                            htmlFor="newsletter-email"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-sans pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#c9a858] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#c9a858] peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-2"
                                        >
                                            Email
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#c9a858] text-black font-serif font-bold tracking-widest uppercase py-4 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                                    >
                                        {isLoading ? "Processing..." : "Subscribe Now"}
                                    </button>

                                    <AnimatePresence>
                                        {message && message.type === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="p-4 flex items-center justify-center gap-3 text-center bg-red-900/20 border border-red-500/30"
                                            >
                                                <FaExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                                <p className="text-sm text-red-300">{message.text}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            )}

                            <p className="text-[10px] md:text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed border-t border-white/10 pt-6">
                                By signing up to receive our newsletter, you agree to our{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="text-[#c9a858] hover:text-[#aa8c46] transition-all duration-200"
                                >
                                    Privacy Policy
                                </Link>
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
