"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiImage, FiAlertCircle } from "react-icons/fi";
import type { News } from "@/types/news";

interface NewsEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<News>) => void;
  initialData: Partial<News> | null;
  isSubmitting: boolean;
  error?: string | string[] | null;
}

const NewsEditorModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isSubmitting,
  error,
}: NewsEditorModalProps) => {
  const [formData, setFormData] = useState<Partial<News>>({
    title: "",
    content: "",
    category: "Update",
    imageUrl: "",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({
        title: "",
        content: "",
        category: "Update",
        imageUrl: "",
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

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
            initial={{ opacity: 0, filter: "blur(14px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(14px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer transition-colors duration-200"
            >
              <FiX className="w-6 h-6" />
            </button>

            <h2 className="font-serif text-2xl font-bold tracking-widest mb-8 border-b border-white/10 pb-4 uppercase">
              {formData._id ? "Revise Chronicle" : "Scribe New Chronicle"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block"
                  >
                    Chronicle Title
                  </label>
                  <input
                    type="text"
                    required
                    name="title"
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#c9a858] transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block"
                  >
                    Category
                  </label>
                  <select
                    value={formData.category || "Update"}
                    id="category"
                    name="category"
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#c9a858] transition-all duration-200"
                  >
                    <option value="Update">Update</option>
                    <option value="Community">Community</option>
                    <option value="Event">Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="imageUrl"
                  className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block"
                >
                  Image URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 px-12 py-3 outline-none focus:border-[#c9a858] transition-all duration-200"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block"
                >
                  Content
                </label>
                <textarea
                  required
                  name="content"
                  id="content"
                  value={formData.content || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#c9a858] transition-all duration-200 h-32 resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="text-sm">
                    {Array.isArray(error) ? (
                      error.map((err, index) => (
                        <p key={index} className="mb-1 last:mb-0">
                          {err}
                        </p>
                      ))
                    ) : (
                      <p>{error}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`flex-1 bg-[#c9a858] text-black font-serif font-bold py-4 tracking-widest uppercase transition-all duration-200 shadow-lg 
                    ${isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-white"
                    }`}
                >
                  {isSubmitting ? "Scribing..." : "Confirm Scribing"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 border border-white/20 text-white font-serif tracking-widest uppercase cursor-pointer hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsEditorModal;
