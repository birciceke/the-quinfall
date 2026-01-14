"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  title?: string;
  message?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  title = "Confirm Deletion",
  message = "Are you certain you wish to proceed? This action is irreversible.",
}: DeleteConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, filter: "blur(14px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(14px)", scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-900/80" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-900/80" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-900/80" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-900/80" />

            <h2 className="font-serif text-2xl font-bold tracking-widest mb-4 uppercase">
              <span className="text-red-900/80">{title.split(" ")[0]}</span>{" "}
              {title.split(" ").slice(1).join(" ")}
            </h2>

            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-4">
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className={`flex-1 bg-red-900/80 border border-red-500/20 text-white font-serif font-bold py-3 tracking-widest uppercase transition-all duration-200 shadow-lg ${isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-red-800"
                  }`}
              >
                {isSubmitting ? "Erasing..." : "Yes, Erase It"}
              </button>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border border-white/20 text-white font-serif font-bold py-3 tracking-widest uppercase cursor-pointer hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
