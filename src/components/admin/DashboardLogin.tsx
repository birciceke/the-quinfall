"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { FiUser, FiLock } from "react-icons/fi";
import axios from "axios";

import Footer from "@/components/Footer";

interface DashboardLoginProps {
    onLoginSuccess: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const DashboardLogin = ({ onLoginSuccess }: DashboardLoginProps) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const response = await axios.post(
                `${API_BASE}/auth/login`,
                formData
            );

            localStorage.setItem("token", response.data.token);

            setMessage({
                text: "Login successful! Redirecting...",
                type: "success",
            });

            setTimeout(() => {
                onLoginSuccess();
            }, 0);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setMessage({
                text: error.response?.data?.message || "Login failed",
                type: "error",
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            <section
                className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-20"
                style={{
                    backgroundImage: "url('/images/backgrounds/bg-general.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/70" />

                <motion.div
                    initial={{ opacity: 0, filter: "blur(16px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative max-w-lg w-full bg-gradient-to-b from-[#0a0a0a] to-[#080808] border border-white/10 p-8 md:p-12 shadow-[0_0_80px_rgba(197,160,89,0.08)] z-10"
                >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Header */}
                        <div className="space-y-3">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">
                                <span className="text-[#c9a858]">Admin</span> Access
                            </h2>
                            <p className="font-sans text-gray-400 text-sm md:text-base tracking-wide">
                                Restricted area. Authorized personnel only.
                            </p>
                        </div>

                        {/* Decorative line */}
                        <div className="w-full flex items-center gap-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="w-2 h-2 rotate-45 border border-[#c9a858]/50 bg-[#c9a858]/10" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            {/* Username input */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#c9a858]/0 group-focus-within:bg-[#c9a858]/5 transition-colors duration-300" />
                                <FiUser
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c9a858] transition-colors duration-200 z-10"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer relative w-full bg-white/[0.03] border border-white/10 px-4 py-4 pl-12 text-white outline-none focus:border-[#c9a858]/60 focus:shadow-[0_0_20px_rgba(201,168,88,0.1)] transition-all duration-300 font-sans"
                                    required
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-sans pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:text-[#c9a858] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#c9a858] peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-2 z-20"
                                >
                                    Username
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#c9a858]/0 group-focus-within:bg-[#c9a858]/5 transition-colors duration-300" />
                                <FiLock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c9a858] transition-colors duration-200 z-10"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer relative w-full bg-white/[0.03] border border-white/10 px-4 py-4 pl-12 text-white outline-none focus:border-[#c9a858]/60 focus:shadow-[0_0_20px_rgba(201,168,88,0.1)] transition-all duration-300 font-sans"
                                    required
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-sans pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:text-[#c9a858] peer-focus:bg-[#0a0a0a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#c9a858] peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-2 z-20"
                                >
                                    Password
                                </label>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#c9a858] text-black font-serif font-bold tracking-widest uppercase py-4 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {isLoading ? "Authenticating..." : "Enter Dashboard"}
                            </button>
                            {/* Message display */}
                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`p-4 flex items-center justify-center gap-3 text-center backdrop-blur-sm ${message.type === "success"
                                            ? "bg-green-900/20 border border-green-500/30"
                                            : "bg-red-900/20 border border-red-500/30"
                                            }`}
                                    >
                                        {message.type === "success" ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        ) : (
                                            <FaExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        )}
                                        <p className={`text-sm ${message.type === "success" ? "text-green-300" : "text-red-300"
                                            }`}>
                                            {message.text}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                    </div>
                </motion.div>
            </section >
            <Footer />
        </>
    );
};

export default DashboardLogin;
