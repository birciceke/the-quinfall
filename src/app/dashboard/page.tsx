"use client";

import { useEffect, useState } from "react";
import { FiMail, FiSettings, FiX, FiShield } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiShieldCheck } from "react-icons/hi";
import { FaNewspaper, FaTwitch } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import DashboardLogin from "@/components/admin/DashboardLogin";
import DashboardNews from "@/components/admin/DashboardNews";
import DashboardSubscriptions from "@/components/admin/DashboardSubscriptions";
import DashboardModeration from "@/components/admin/DashboardModeration";
import DashboardTwitchDrops from "@/components/admin/DashboardTwitchDrops";
import NewsEditorModal from "@/components/modals/NewsEditorModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";

import { getSteamPlayerCount } from "@/services/steam";

import type { RootState, AppDispatch } from "@/store";
import {
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
    clearError,
} from "@/store/slices/news";
import type { News } from "@/types/news";

import {
    fetchSubscriptions,
    deleteSubscription,
    toggleSubscriptionStatus,
} from "@/store/slices/subscription";

import {
    fetchMaintenanceStatus,
    toggleMaintenanceMode,
} from "@/store/slices/maintenance";

import type { Subscription } from "@/types/subscription";

export default function AdminDashboardPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [adminUsername, setAdminUsername] = useState<string>("Admin");

    const {
        data: news,
        isLoading: isNewsLoading,
        error: newsError,
    } = useSelector((state: RootState) => state.news);

    const {
        data: subscriptions,
        isLoading: isSubscriptionsLoading,
        error: subscriptionError,
    } = useSelector((state: RootState) => state.subscription);

    const {
        isActive: maintenanceActive,
        isLoading: maintenanceLoading,
        activatedBy: maintenanceActivatedBy,
    } = useSelector((state: RootState) => state.maintenance);

    const [activeTab, setActiveTab] = useState<
        "news" | "subscriptions" | "twitch-drops" | "moderation"
    >("news");

    const [searchQuery, setSearchQuery] = useState("");
    const [playerCount, setPlayerCount] = useState<number | null>(null);
    const [playerError, setPlayerError] = useState(false);

    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<News> | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [itemToDelete, setItemToDelete] = useState<News | Subscription | null>(
        null
    );
    const [deleteType, setDeleteType] = useState<"news" | "subscription" | null>(
        null
    );

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
                const response = await fetch(`${API_BASE}/auth/verify`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user?.username) {
                        setAdminUsername(data.user.username);
                    }
                    setIsAuthenticated(true);
                } else {
                    // Token is invalid, remove it
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchMaintenanceStatus());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (activeTab === "news") {
            dispatch(fetchNews());
        }

        if (activeTab === "subscriptions" || activeTab === "moderation") {
            dispatch(fetchSubscriptions());
        }
    }, [activeTab, dispatch]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsEditorOpen(false);
                setIsDeleteModalOpen(false);
                setSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    const filteredNews = news
        .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice()
        .reverse();

    const handleDeleteSubscriptionClick = (item: Subscription) => {
        setItemToDelete(item);
        setDeleteType("subscription");
        setIsDeleteModalOpen(true);
    };

    const handleToggleSubscription = (item: Subscription) => {
        dispatch(toggleSubscriptionStatus(item._id));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAdminUsername("Admin");
        setIsAuthenticated(false);
    };

    const handleSaveNews = async (newsData: Partial<News>) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const formattedData = {
            title: newsData.title!,
            content: newsData.content!,
            imageUrl: newsData.imageUrl!,
            category: newsData.category!,
        };

        try {
            if (newsData._id) {
                await dispatch(
                    updateNews({
                        _id: newsData._id,
                        newsData: formattedData,
                    })
                ).unwrap();
            } else {
                await dispatch(createNews(formattedData)).unwrap();
            }

            setIsEditorOpen(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Archive Error: Failed to save chronicle:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteNewsClick = (item: News) => {
        setItemToDelete(item);
        setDeleteType("news");
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete || !itemToDelete._id || isSubmitting) return;

        setIsSubmitting(true);

        try {
            if (deleteType === "news") {
                await dispatch(deleteNews(itemToDelete._id)).unwrap();
            } else if (deleteType === "subscription") {
                await dispatch(deleteSubscription(itemToDelete._id)).unwrap();
            }

            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            setDeleteType(null);
        } catch (error) {
            console.error("Archive Error: Failed to erase record:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPlayerCount = async () => {
            try {
                const count = await getSteamPlayerCount();
                setPlayerCount(count);
                setPlayerError(false);
            } catch {
                setPlayerError(true);
            }
        };

        fetchPlayerCount();
        const interval = setInterval(fetchPlayerCount, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleTabChange = (tab: "news" | "subscriptions" | "twitch-drops" | "moderation") => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    const NavButton = ({ tab, icon: Icon, label }: { tab: "news" | "subscriptions" | "twitch-drops" | "moderation"; icon: React.ElementType; label: string }) => (
        <button
            onClick={() => handleTabChange(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === tab
                ? "bg-[#c9a858] text-black font-bold"
                : "hover:bg-white/5 text-gray-400"
                }`}
        >
            <Icon className="w-5 h-5" /> {label}
        </button>
    );

    if (isAuthenticated === null) {
        return (
            <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#c9a858] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleLoginSuccess = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.username) {
                    setAdminUsername(payload.username);
                }
            } catch (e) {
                console.error("Failed to decode token:", e);
            }
        }
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <DashboardLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(16px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed inset-0 z-[1000] bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden font-sans"
        >
            <header className="md:hidden h-16 border-b border-white/10 bg-black flex items-center justify-between px-4">
                <Image
                    src="/images/logos/the-quinfall-logo.png"
                    alt="The Quinfall"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                    draggable={false}
                />
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                >
                    <HiOutlineMenuAlt3 size={24} />
                </button>
            </header>

            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="md:hidden fixed top-0 left-0 h-full w-[280px] border-r border-white/10 bg-black flex flex-col z-[70]"
                        >
                            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                <Image
                                    src="/images/logos/the-quinfall-logo.png"
                                    alt="The Quinfall"
                                    width={120}
                                    height={32}
                                    className="h-8 w-auto object-contain"
                                    draggable={false}
                                />
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="p-4 border-b border-white/10">
                                <div
                                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-full text-[10px] font-bold tracking-widest ${playerError
                                        ? "bg-red-900/10 border border-red-500/30 text-red-500"
                                        : "bg-green-900/10 border border-green-500/30 text-green-500"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${playerError ? "bg-red-500" : "bg-green-500"
                                            }`}
                                    />
                                    {playerError
                                        ? "Unavailable"
                                        : `Live: ${playerCount}`}
                                </div>
                            </div>

                            <nav className="flex-1 py-4 px-4 space-y-2">
                                <NavButton tab="news" icon={FaNewspaper} label="News" />
                                <NavButton tab="subscriptions" icon={FiMail} label="Subscriptions" />
                                <NavButton tab="twitch-drops" icon={FaTwitch} label="Twitch Drops" />
                                <NavButton tab="moderation" icon={FiSettings} label="Moderation" />
                            </nav>

                            <div className="p-4 border-t border-white/10">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-white font-semibold text-sm truncate">{adminUsername}</span>
                                        <span className="text-[#c9a858] text-xs font-medium flex items-center gap-1">
                                            <HiShieldCheck className="w-3 h-3" />
                                            Admin
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center w-8 h-8 rounded bg-red-900/80 text-white hover:bg-red-800 transition-all duration-200 cursor-pointer flex-shrink-0"
                                        title="End Session"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <aside className="hidden md:flex w-64 border-r border-white/10 bg-black flex-col">
                <div className="p-8 border-b border-white/10 flex justify-center items-center flex-col gap-4">
                    <Image
                        src="/images/logos/the-quinfall-logo.png"
                        alt="The Quinfall"
                        width={150}
                        height={40}
                        className="h-10 w-auto object-contain"
                        draggable={false}
                    />
                    <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest animate-fade-in-up ${playerError
                            ? "bg-red-900/10 border border-red-500/30 text-red-500"
                            : "bg-green-900/10 border border-green-500/30 text-green-500"
                            }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${playerError ? "bg-red-500" : "bg-green-500"
                                }`}
                        />
                        {playerError
                            ? "Player Data Unavailable"
                            : `Live Players: ${playerCount}`}
                    </div>
                </div>

                <nav className="flex-1 py-8 px-4 space-y-2">
                    <NavButton tab="news" icon={FaNewspaper} label="News" />
                    <NavButton tab="subscriptions" icon={FiMail} label="Subscriptions" />
                    <NavButton tab="twitch-drops" icon={FaTwitch} label="Twitch Drops" />
                    <NavButton tab="moderation" icon={FiSettings} label="Moderation" />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col min-w-0">
                            <span className="text-white font-semibold text-sm truncate">{adminUsername}</span>
                            <span className="text-[#c9a858] text-xs font-medium flex items-center gap-1">
                                <HiShieldCheck className="w-3 h-3" />
                                Admin
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-8 h-8 rounded bg-red-900/80 text-white hover:bg-red-800 transition-all duration-200 cursor-pointer flex-shrink-0"
                            title="End Session"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                <header className="h-14 sm:h-16 md:h-20 border-b border-white/10 bg-black/40 backdrop-blur-md px-4 sm:px-6 md:px-8 flex items-center">
                    <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-widest uppercase">
                        {activeTab === "twitch-drops" ? "Twitch Drops" : activeTab}
                    </h1>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative">
                    <AnimatePresence mode="wait">
                        {activeTab === "news" && (
                            <DashboardNews
                                news={filteredNews}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                onCreate={() => {
                                    setEditingItem({
                                        title: "",
                                        content: "",
                                        category: "Update",
                                    });
                                    setIsEditorOpen(true);
                                }}
                                onEdit={(item) => {
                                    setEditingItem(item);
                                    setIsEditorOpen(true);
                                }}
                                onDelete={handleDeleteNewsClick}
                                isLoading={isNewsLoading}
                                error={newsError}
                            />
                        )}

                        {activeTab === "subscriptions" && (
                            <DashboardSubscriptions
                                subscriptions={[...subscriptions].reverse()}
                                isLoading={isSubscriptionsLoading}
                                error={subscriptionError}
                                onDelete={handleDeleteSubscriptionClick}
                                onToggle={handleToggleSubscription}
                            />
                        )}

                        {activeTab === "twitch-drops" && (
                            <DashboardTwitchDrops />
                        )}

                        {activeTab === "moderation" && (
                            <DashboardModeration
                                playerCount={playerCount}
                                playerError={playerError}
                                totalSubscriptions={subscriptions.length}
                                maintenanceActive={maintenanceActive}
                                maintenanceLoading={maintenanceLoading}
                                maintenanceActivatedBy={maintenanceActivatedBy}
                                onToggleMaintenance={() => dispatch(toggleMaintenanceMode())}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <NewsEditorModal
                isOpen={isEditorOpen}
                onClose={() => {
                    setIsEditorOpen(false);
                    dispatch(clearError());
                }}
                onSave={handleSaveNews}
                initialData={editingItem}
                isSubmitting={isSubmitting}
                error={newsError}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isSubmitting={isSubmitting}
                title={
                    deleteType === "news"
                        ? "Confirm Chronicle Deletion"
                        : "Confirm Subscription Removal"
                }
                message={
                    deleteType === "news"
                        ? "Are you certain you wish to erase this chronicle? This action is irreversible and the record will be lost to the void forever."
                        : "Are you certain you wish to remove this subscriber from the mailing list? They will no longer receive updates from the realm."
                }
            />
        </motion.div>
    );
}
