"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiCheck,
  FiX,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import type { Subscription } from "@/types/subscription";

import DashboardSubscriptionRow from "./DashboardSubscriptionRow";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 7;

interface DashboardSubscriptionsProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
  error?: string | null;
  onDelete: (item: Subscription) => void;
  onToggle: (item: Subscription) => void;
}

const SubscriptionCard = ({
  item,
  onDelete,
  onToggle,
}: {
  item: Subscription;
  onDelete: (item: Subscription) => void;
  onToggle: (item: Subscription) => void;
}) => (
  <div className={`bg-white/5 border border-white/10 p-4 ${item.status === "Inactive" ? "opacity-50" : ""}`}>
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 min-w-0">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${item.status === "Active" ? "bg-green-500" : "bg-gray-600"
            }`}
        />
        <span className="text-sm font-sans truncate">{item.email}</span>
      </div>
      {item.status === "Active" ? (
        <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-green-500 font-bold px-2 py-1 bg-green-900/20 border border-green-500/30 rounded-full shrink-0">
          <FiCheck className="w-3 h-3" /> Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-gray-400 font-bold px-2 py-1 bg-white/5 border border-white/20 rounded-full shrink-0">
          <FiX className="w-3 h-3" /> Inactive
        </span>
      )}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(item)}
          className={`p-2 rounded-full transition-all cursor-pointer text-gray-400 hover:bg-white/10 ${item.status === "Active"
            ? "hover:text-orange-500"
            : "hover:text-green-500"
            }`}
        >
          {item.status === "Active" ? (
            <FiUserMinus size={16} />
          ) : (
            <FiUserPlus size={16} />
          )}
        </button>
        <button
          onClick={() => onDelete(item)}
          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/10 transition-all cursor-pointer"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

const DashboardSubscriptions = ({
  subscriptions,
  isLoading = false,
  error,
  onDelete,
  onToggle,
}: DashboardSubscriptionsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(subscriptions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubscriptions = subscriptions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [subscriptions.length, currentPage, totalPages]);

  return (
    <motion.section
      key="subscriptions"
      initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-6"
    >
      <p className="text-gray-400 text-sm">
        List of players awaiting news from The Quinfall.
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <ImSpinner8 className="w-8 h-8 text-[#c9a858] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-10 border border-dashed border-red-500/20 text-red-400">
          {error}
        </div>
      ) : subscriptions.length > 0 ? (
        <>
          <div className="hidden md:block bg-white/5 border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Subscription Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {paginatedSubscriptions.map((item) => (
                    <DashboardSubscriptionRow
                      key={item._id}
                      item={item}
                      onDelete={onDelete}
                      onToggle={onToggle}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {paginatedSubscriptions.map((item) => (
              <SubscriptionCard
                key={item._id}
                item={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={subscriptions.length}
            itemsPerPage={ITEMS_PER_PAGE}
            itemName="subscribers"
          />
        </>
      ) : (
        <div className="text-center py-10 border border-dashed border-white/10 text-gray-500">
          No souls have wandered into the mailing list yet.
        </div>
      )}
    </motion.section>
  );
};

export default DashboardSubscriptions;
