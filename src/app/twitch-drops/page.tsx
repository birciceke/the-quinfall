"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    FaSteam,
    FaTwitch,
    FaGift,
    FaLock,
    FaArrowRight,
    FaExclamationCircle,
    FaCheckCircle,
} from "react-icons/fa";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";

import Footer from "@/components/Footer";

const STORAGE_KEY = "userAuthData";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface StepProps {
    stepNumber: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    iconBgColor: string;
    isCompleted: boolean;
    isActive: boolean;
    isLast: boolean;
    nextCompleted: boolean;
    onDisconnect?: () => void;
    children: React.ReactNode;
}

function Step({ stepNumber, title, description, icon, iconBgColor, isCompleted, isActive, isLast, nextCompleted, onDisconnect, children }: StepProps) {
    return (
        <div className="flex">
            <div className="flex flex-col items-center mr-4 md:mr-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: stepNumber * 0.15, duration: 0.4 }}
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 flex-shrink-0 ${isCompleted
                        ? "border-[#c9a858] bg-[#c9a858]/20 shadow-[0_0_15px_rgba(201,168,88,0.25)]"
                        : isActive
                            ? `border-white/40 ${iconBgColor} shadow-lg`
                            : "border-white/10 bg-black/60"
                        }`}
                >
                    {isCompleted ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <FaCheck className="w-5 h-5 md:w-6 md:h-6 text-[#c9a858]" />
                        </motion.div>
                    ) : (
                        <div className={`${isActive ? "text-white" : "text-gray-500"}`}>
                            {icon}
                        </div>
                    )}

                    {isActive && !isCompleted && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-white/20"
                        />
                    )}
                </motion.div>

                {!isLast && (
                    <div className="relative w-0.5 flex-1 min-h-[40px] bg-white/10 mt-2">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: isCompleted ? "100%" : nextCompleted ? "100%" : "0%" }}
                            transition={{ duration: 0.6, delay: stepNumber * 0.2, ease: "easeOut" }}
                            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#c9a858] to-[#c9a858]/50"
                        />
                    </div>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stepNumber * 0.15 + 0.1, duration: 0.4 }}
                className="flex-1 pb-6"
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-base md:text-lg font-serif font-bold uppercase tracking-wide ${isCompleted ? "text-[#c9a858]" : isActive ? "text-white" : "text-gray-500"
                        }`}>
                        {title}
                    </h3>
                    {isCompleted && onDisconnect && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={onDisconnect}
                            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                            title="Disconnect"
                        >
                            <FaXmark className="w-3.5 h-3.5" />
                        </motion.button>
                    )}
                </div>

                <p className={`text-xs md:text-sm mb-4 leading-relaxed ${isActive || isCompleted ? "text-gray-400" : "text-gray-600"
                    }`}>
                    {description}
                </p>

                <div className={`${!isActive && !isCompleted ? "opacity-40 pointer-events-none" : ""}`}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

function TwitchDropsContent() {
    const [steamLinked, setSteamLinked] = useState(false);
    const [twitchLinked, setTwitchLinked] = useState(false);
    const [rewardsCollected, setRewardsCollected] = useState(false);
    const [collectCooldown, setCollectCooldown] = useState(0);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    const searchParams = useSearchParams();

    const saveAuthData = (data: Record<string, unknown>) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Auth save error", e);
        }
    };

    const loadAuthData = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error("Auth load error", e);
            return {};
        }
    };

    const clearAuthData = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    useEffect(() => {
        const steamId = searchParams.get("steamId");
        const errorParam = searchParams.get("error");

        if (errorParam === "TwitchAlreadyLinked") {
            setMessage({
                text: "This Twitch account is already linked to another Steam account!",
                type: "error",
            });
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (errorParam === "SteamAlreadyLinked") {
            setMessage({
                text: "This Steam account is already linked to another Twitch account!",
                type: "error",
            });
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (steamId) {
            const usernameParam = searchParams.get("username") || "";
            const twitchLinkedParam = searchParams.get("twitchLinked") === "true";
            const twitchUsernameParam = searchParams.get("twitchUsername") || "";

            setSteamLinked(true);
            setTwitchLinked(twitchLinkedParam);

            saveAuthData({
                steamLinked: true,
                username: usernameParam,
                twitchLinked: twitchLinkedParam,
                twitchUsername: twitchUsernameParam,
            });

            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        const stored = loadAuthData();
        if (stored.steamLinked) {
            setSteamLinked(true);
            if (stored.twitchLinked) setTwitchLinked(true);
        } else {
            clearAuthData();
        }
    }, [searchParams]);

    const handleSteamLogin = () => {
        clearAuthData();
        window.location.href = `${API_BASE}/steam/auth`;
    };

    const handleSteamLogout = () => {
        clearAuthData();
        setSteamLinked(false);
        window.location.href = `${API_BASE}/steam/logout`;
    };

    const handleTwitchLogin = () => {
        if (!steamLinked) return;
        window.location.href = `${API_BASE}/twitch/auth`;
    };

    const handleTwitchLogout = () => {
        const stored = loadAuthData();
        saveAuthData({ ...stored, twitchLinked: false, twitchUsername: "" });
        setTwitchLinked(false);
        window.location.href = `${API_BASE}/twitch/logout`;
    };

    const handleCollectRewards = async () => {
        if (!steamLinked || !twitchLinked || collectCooldown > 0) return;

        setMessage(null);

        try {
            const resp = await fetch(`${API_BASE}/twitch/collect`, {
                method: "POST",
                credentials: "include",
            });
            const json = await resp.json();

            if (json.success) {
                setRewardsCollected(true);
                setMessage({
                    text: json.message || "Your Twitch reward has been found and will be delivered to your in-game account within 5 minutes!",
                    type: "success",
                });
            } else {
                setMessage({
                    text: json.message || "No rewards available.",
                    type: "error",
                });
            }
        } catch {
            setMessage({
                text: "Server error. Try again later.",
                type: "error",
            });
        } finally {
            setCollectCooldown(10);
            const interval = setInterval(() => {
                setCollectCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    return (
        <>
            <section
                className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-20 py-24 md:py-32"
                style={{
                    backgroundImage: "url('/images/backgrounds/bg-general.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/70" />

                <motion.div
                    initial={{ opacity: 0, filter: "blur(16px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative z-10 max-w-2xl w-full"
                >
                    <div className="relative bg-black/70 border border-white/20 shadow-2xl p-6 sm:p-8 md:p-10">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#9146FF]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9146FF]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#9146FF]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9146FF]" />

                        <div className="text-center mb-8 md:mb-10">
                            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-white mb-3">
                                <span className="text-[#9146FF]">Twitch</span> Drops
                            </h1>
                            <p className="text-gray-400 text-sm max-w-md mx-auto font-sans">
                                Link your accounts and claim exclusive in-game rewards by watching
                                The Quinfall streams on Twitch.
                            </p>
                        </div>

                        {/* Decorative line */}
                        <div className="w-full flex items-center gap-4 mb-8 md:mb-10">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="w-2 h-2 rotate-45 border border-[#9146FF]/50 bg-[#9146FF]/10" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <div className="relative">
                            <Step
                                stepNumber={1}
                                title="Connect Steam"
                                description={steamLinked ? "Your Steam account has been successfully linked." : "Link your Steam account to verify game ownership."}
                                icon={<FaSteam className="w-5 h-5 md:w-6 md:h-6" />}
                                iconBgColor="bg-[#171a21]"
                                isCompleted={steamLinked}
                                isActive={!steamLinked}
                                isLast={false}
                                nextCompleted={twitchLinked}
                                onDisconnect={steamLinked ? handleSteamLogout : undefined}
                            >
                                {!steamLinked && (
                                    <button
                                        onClick={handleSteamLogin}
                                        className="w-full py-3 px-4 bg-[#171a21] hover:bg-[#2a475e] text-white font-bold tracking-wider uppercase text-xs md:text-sm transition-colors flex items-center justify-center cursor-pointer"
                                    >
                                        Connect Steam
                                    </button>
                                )}
                            </Step>

                            <Step
                                stepNumber={2}
                                title="Connect Twitch"
                                description={twitchLinked ? "Your Twitch account has been successfully linked." : "Link your Twitch account to track your watch time."}
                                icon={<FaTwitch className="w-5 h-5 md:w-6 md:h-6" />}
                                iconBgColor="bg-[#9146FF]"
                                isCompleted={twitchLinked}
                                isActive={steamLinked && !twitchLinked}
                                isLast={false}
                                nextCompleted={rewardsCollected}
                                onDisconnect={twitchLinked ? handleTwitchLogout : undefined}
                            >
                                {!twitchLinked && (
                                    <button
                                        onClick={steamLinked ? handleTwitchLogin : undefined}
                                        disabled={!steamLinked}
                                        className={`w-full py-3 px-4 font-bold tracking-wider uppercase text-xs md:text-sm transition-colors flex items-center justify-center gap-2 ${steamLinked
                                            ? "bg-[#9146FF] hover:bg-[#772CE8] text-white cursor-pointer"
                                            : "bg-gray-900/50 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        {steamLinked ? "Connect Twitch" : (<><FaLock className="w-3 h-3" />Complete Previous Step</>)}
                                    </button>
                                )}
                            </Step>

                            <Step
                                stepNumber={3}
                                title="Claim Rewards"
                                description={rewardsCollected
                                    ? "Your rewards have been successfully claimed!"
                                    : "Click the button to claim available drops."
                                }
                                icon={<FaGift className="w-5 h-5 md:w-6 md:h-6" />}
                                iconBgColor="bg-[#c9a858]"
                                isCompleted={rewardsCollected}
                                isActive={steamLinked && twitchLinked && !rewardsCollected}
                                isLast={true}
                                nextCompleted={false}
                            >
                                {!rewardsCollected && (
                                    <button
                                        onClick={handleCollectRewards}
                                        disabled={!twitchLinked || collectCooldown > 0}
                                        className={`w-full py-3.5 px-4 font-bold tracking-wider uppercase text-xs md:text-sm transition-colors flex items-center justify-center gap-2 group ${!twitchLinked
                                            ? "bg-gray-900/50 text-gray-500 cursor-not-allowed"
                                            : collectCooldown > 0
                                                ? "bg-[#c9a858]/40 text-black/60 cursor-not-allowed"
                                                : "bg-[#c9a858] hover:bg-[#d4b369] text-black cursor-pointer"
                                            }`}
                                    >
                                        {!twitchLinked ? (
                                            <>
                                                <FaLock className="w-3 h-3" />
                                                Complete Previous Steps
                                            </>
                                        ) : collectCooldown > 0 ? (
                                            <>
                                                <ImSpinner8 className="w-4 h-4 animate-spin" />
                                                Please Wait ({collectCooldown}s)
                                            </>
                                        ) : (
                                            "Claim Available Drops"
                                        )}
                                    </button>
                                )}
                            </Step>
                        </div>

                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`mt-6 p-4 flex items-center justify-center gap-3 text-center ${message.type === "success"
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
                    </div>
                </motion.div>
            </section>
        </>
    );
}

function LoadingFallback() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: "url('/images/backgrounds/bg-general.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/80" />
            <ImSpinner8 className="w-12 h-12 text-[#9146FF] animate-spin relative z-10" />
        </section>
    );
}

export default function TwitchDropsPage() {
    return (
        <>
            <Suspense fallback={<LoadingFallback />}>
                <TwitchDropsContent />
            </Suspense>
            <Footer />
        </>
    );
}
