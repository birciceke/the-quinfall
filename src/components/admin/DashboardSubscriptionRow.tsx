"use client";

import {
  FiTrash2,
  FiCheck,
  FiX,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import type { Subscription } from "@/types/subscription";

interface DashboardSubscriptionRowProps {
  item: Subscription;
  onDelete: (item: Subscription) => void;
  onToggle: (item: Subscription) => void;
}

const DashboardSubscriptionRow = ({
  item,
  onDelete,
  onToggle,
}: DashboardSubscriptionRowProps) => {
  return (
    <tr
      className={`transition-colors group ${item.status === "Inactive"
          ? "opacity-50 hover:opacity-70"
          : "hover:bg-white/2"
        }`}
    >
      <td className="px-6 py-4 text-sm font-sans">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${item.status === "Active" ? "bg-green-500" : "bg-gray-600"
              }`}
          />
          {item.email}
        </div>
      </td>

      <td className="px-6 py-4">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="px-6 py-4">
        {item.status === "Active" ? (
          <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-green-500 font-bold px-2 py-1 bg-green-900/20 border border-green-500/30 rounded-full">
            <FiCheck className="w-3 h-3" /> Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-gray-400 font-bold px-2 py-1 bg-white/5 border border-white/20 rounded-full">
            <FiX className="w-3 h-3" /> Inactive
          </span>
        )}
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onToggle(item)}
            className={`p-2.5 rounded-full transition-all cursor-pointer text-gray-400 hover:bg-white/10 ${item.status === "Active"
                ? "hover:text-orange-500"
                : "hover:text-green-500"
              }`}
            title={
              item.status === "Active"
                ? "Inactivate Subscription"
                : "Re-activate Subscription"
            }
          >
            {item.status === "Active" ? (
              <FiUserMinus size={20} />
            ) : (
              <FiUserPlus size={20} />
            )}
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/10 transition-all cursor-pointer"
            title="Banish Subscription"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DashboardSubscriptionRow;
