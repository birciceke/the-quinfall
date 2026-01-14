"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTwitch, FaSteam, FaGift, FaServer } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

import Pagination from "@/components/Pagination";

const DROP_NAMES: Record<string, string> = {
    "f769e105-f9cc-11ef-b72b-0a58a9feac02": "Valuable Package",
    "0288f3ab-f9cd-11ef-92b7-0a58a9feac02": "Anostia's Blessing",
    "9dc0a0bb-ef8d-11ef-8ad0-0a58a9feac02": "Ordenus Secret Arts",
    "463e56ee-24e3-11f0-8646-0a58a9feac02": "Enchanted Phoenix",
};

interface TwitchDropsUser {
    _id: string;
    steamId: string | null;
    twitchId: string;
    drops: string[];
    serverEU: number;
    serverNA: number;
    serverASIA: number;
    createdAt: string;
    updatedAt: string;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const DashboardTwitchDrops = () => {
    const [users, setUsers] = useState<TwitchDropsUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 3,
        total: 0,
        totalPages: 0,
    });

    const fetchUsers = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_BASE}/twitch/users?page=${page}&limit=${pagination.limit}`
            );
            const data = await response.json();

            if (data.success) {
                setUsers(data.data);
                setPagination(data.pagination);
                setError(null);
            } else {
                setError(data.message || "Failed to fetch users");
            }
        } catch (err) {
            setError("Failed to connect to server.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePageChange = (page: number) => {
        fetchUsers(page);
    };

    const getDropImage = (dropId: string) => {
        return `/images/drops/${dropId}.png`;
    };

    const getDropName = (dropId: string) => {
        return DROP_NAMES[dropId] || "Unknown Drop";
    };

    if (isLoading) {
        return (
            <motion.div
                key="twitch-drops-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
            >
                <ImSpinner8 className="w-8 h-8 text-[#c9a858] animate-spin" />
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                key="twitch-drops-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 text-red-400"
            >
                <p className="text-sm">{error}</p>
                <button
                    onClick={() => fetchUsers()}
                    className="mt-4 px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-300 text-xs uppercase tracking-widest cursor-pointer hover:bg-red-900/40 transition-all"
                >
                    Retry
                </button>
            </motion.div>
        );
    }

    return (
        <motion.section
            key="twitch-drops"
            initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                    View all users who have claimed Twitch Drops rewards.
                </p>
                <div className="flex items-center gap-2 text-[#6441a5] text-xs font-bold tracking-widest">
                    <FaTwitch className="w-4 h-4" />
                    <span>{pagination.total} Users</span>
                </div>
            </div>

            {users.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="p-4 sm:p-6 border border-white/10 bg-white/5 hover:border-[#6441a5]/30 transition-all duration-300"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 pb-4 border-b border-white/5">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-[#6441a5]/20 border border-[#6441a5]/30 flex items-center justify-center">
                                            <FaTwitch className="w-5 h-5 text-[#6441a5]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                                Twitch ID
                                            </p>
                                            <p className="text-white font-mono text-sm">{user.twitchId}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-gray-800 border border-white/10 flex items-center justify-center">
                                            <FaSteam className="w-5 h-5 text-white/70" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                                Steam ID
                                            </p>
                                            <p className="text-white font-mono text-sm">
                                                {user.steamId || "Not Linked"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaServer className="w-4 h-4 text-gray-500" />
                                        <div className="flex gap-1">
                                            <span
                                                className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${user.serverEU
                                                    ? "bg-green-900/20 text-green-400 border border-green-500/30"
                                                    : "bg-gray-800 text-gray-500 border border-white/10"
                                                    }`}
                                            >
                                                EU
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${user.serverNA
                                                    ? "bg-green-900/20 text-green-400 border border-green-500/30"
                                                    : "bg-gray-800 text-gray-500 border border-white/10"
                                                    }`}
                                            >
                                                NA
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${user.serverASIA
                                                    ? "bg-green-900/20 text-green-400 border border-green-500/30"
                                                    : "bg-gray-800 text-gray-500 border border-white/10"
                                                    }`}
                                            >
                                                ASIA
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <FaGift className="w-4 h-4 text-[#c9a858]" />
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                            Claimed Drops ({user.drops.length})
                                        </span>
                                    </div>

                                    {user.drops.length > 0 ? (
                                        <div className="flex flex-wrap gap-3">
                                            {user.drops.map((dropId, index) => (
                                                <div
                                                    key={`${dropId}-${index}`}
                                                    className="flex items-center gap-2 bg-black/40 border border-white/10 p-2 hover:border-[#c9a858]/30 transition-all"
                                                >
                                                    <img
                                                        src={getDropImage(dropId)}
                                                        alt={getDropName(dropId)}
                                                        className="w-10 h-10 object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = "none";
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="text-white text-xs font-medium">
                                                            {getDropName(dropId)}
                                                        </p>
                                                        <p className="text-gray-500 text-[9px] font-mono">
                                                            {dropId.slice(0, 8)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-xs italic">
                                            No drops claimed yet or already fulfilled.
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-4 mt-4 pt-4 border-t border-white/5 text-[9px] text-gray-500">
                                    <span>
                                        Created: {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span>
                                        Updated: {new Date(user.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center pt-4">
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                totalItems={pagination.total}
                                itemsPerPage={pagination.limit}
                                onPageChange={handlePageChange}
                                itemName="users"
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-10 border border-dashed border-white/10 text-gray-500">
                    No adventurers have claimed their Twitch rewards yet.
                </div>
            )}
        </motion.section>
    );
};

export default DashboardTwitchDrops;
