"use client";

import { motion } from "framer-motion";
import { FiUsers, FiMail, FiAlertTriangle } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";

interface DashboardModerationProps {
  playerCount: number | null;
  playerError: boolean;
  totalSubscriptions: number;
  maintenanceActive: boolean;
  maintenanceLoading: boolean;
  maintenanceActivatedBy: string | null;
  onToggleMaintenance: () => void;
}

const DashboardModeration = ({
  playerCount,
  playerError,
  totalSubscriptions,
  maintenanceActive,
  maintenanceLoading,
  maintenanceActivatedBy,
  onToggleMaintenance,
}: DashboardModerationProps) => {
  return (
    <motion.section
      key="moderation"
      initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-xs sm:text-sm">
          Control the laws of existence in The Quinfall. Real-time data provided
          by The Quinfall.
        </p>
      </div>

      <div className="p-4 sm:p-6 md:p-8 border border-white/10 bg-white/5 shadow-2xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <IoIosStats className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a858]" />
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-bold mb-2 uppercase tracking-widest">
          Statistics
        </h3>

        <div className="space-y-4 mb-6 sm:mb-8">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FiUsers className="w-3 h-3" />
              Live Players
            </span>
            <span className="text-white font-mono font-bold text-sm sm:text-base">
              {playerError
                ? "Player Data Unavailable"
                : `${playerCount ?? "..."}`}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FiMail className="w-3 h-3" />
              Total Subscriptions
            </span>
            <span className="text-white font-mono font-bold text-sm sm:text-base">
              {totalSubscriptions}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#c9a858] animate-pulse" />
            <span className="text-sm font-medium">
              Version: <span className="text-[#c9a858]">{APP_VERSION}</span>
            </span>
          </div>
        </div>
      </div>

      <div className={`p-4 sm:p-6 md:p-8 border bg-white/5 shadow-2xl transition-all duration-300 ${maintenanceActive ? "border-red-900/80 shadow-red-900/20" : "border-white/10"}`}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <FiAlertTriangle className={`w-8 h-8 sm:w-10 sm:h-10 ${maintenanceActive ? "text-red-900/80" : "text-gray-500"}`} />
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-bold mb-2 uppercase tracking-widest">
          Maintenance Mode
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm mb-6">
          When enabled, all visitors will be redirected to a maintenance page.
          Only the admin dashboard will remain accessible.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${maintenanceActive ? "bg-red-900/80 animate-pulse" : "bg-green-500"
                  }`}
              />
              <span className="text-sm font-medium">
                Site Status:{" "}
                {maintenanceActive ? (
                  <span className="text-red-900/80">
                    Under Maintenance
                  </span>
                ) : (
                  <span className="text-green-400">Online</span>
                )}
              </span>
            </div>
            {maintenanceActive && maintenanceActivatedBy && (
              <span className="text-xs text-gray-500 ml-6">
                Enabled by: <span className="text-red-900/80">{maintenanceActivatedBy}</span>
              </span>
            )}
          </div>

          <button
            onClick={onToggleMaintenance}
            disabled={maintenanceLoading}
            className={`px-4 sm:px-6 py-2.5 font-bold uppercase text-xs tracking-widest transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${maintenanceActive
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-red-900/80 hover:bg-red-800 text-white"
              }`}
          >
            {maintenanceLoading
              ? "Processing..."
              : maintenanceActive
                ? "Disable Maintenance"
                : "Enable Maintenance"}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardModeration;
