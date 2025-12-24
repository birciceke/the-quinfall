import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GALLERY_DATA } from "../data/gallery-data";

const images = GALLERY_DATA;

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeKey, setActiveKey] = useState<null | "ArrowLeft" | "ArrowRight">(
    null
  );
  const total = images.length;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setActiveKey("ArrowRight");
        nextImage();
      }

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setActiveKey("ArrowLeft");
        prevImage();
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  const THUMBNAIL_COUNT = 8;
  const currentBlock = Math.floor(currentIndex / THUMBNAIL_COUNT);
  const start = currentBlock * THUMBNAIL_COUNT;
  const thumbnails = images.slice(start, start + THUMBNAIL_COUNT);

  const currentImage = images[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage.id}
          src={currentImage.src}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1.15, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1, filter: "blur(6px)" }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 1.6, ease: "linear" },
          }}
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

      <div className="absolute bottom-56 left-1/2 z-30 flex -translate-x-1/2 gap-10">
        <button
          onClick={prevImage}
          onMouseDown={() => setActiveKey("ArrowLeft")}
          onMouseUp={() => setActiveKey(null)}
          onMouseLeave={() => setActiveKey(null)}
          className={`flex flex-col items-center gap-4 group transition-all duration-200 cursor-pointer ${
            activeKey === "ArrowLeft"
              ? "scale-90 translate-y-1"
              : "hover:scale-105"
          }`}
        >
          <div
            className={`relative w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border-2 flex items-center justify-center rounded-xl transition-all shadow-lg ${
              activeKey === "ArrowLeft"
                ? "border-quinfall-gold bg-quinfall-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                : "border-white/20 group-hover:border-white/60"
            }`}
          >
            <FaChevronLeft
              className={`w-6 h-6 md:w-8 md:h-8 ${
                activeKey === "ArrowLeft" ? "text-quinfall-gold" : "text-white"
              }`}
            />

            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black border border-white/20 rounded text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Left
            </div>
          </div>
          <span className="hidden md:block text-[10px] font-serif font-bold tracking-[0.3em] text-white/40 group-hover:text-white transition-colors uppercase">
            Previous
          </span>
        </button>

        <button
          onClick={nextImage}
          onMouseDown={() => setActiveKey("ArrowRight")}
          onMouseUp={() => setActiveKey(null)}
          onMouseLeave={() => setActiveKey(null)}
          className={`flex flex-col items-center gap-4 group transition-all duration-200 cursor-pointer ${
            activeKey === "ArrowRight"
              ? "scale-90 translate-y-1"
              : "hover:scale-105"
          }`}
        >
          <div
            className={`relative w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border-2 flex items-center justify-center rounded-xl transition-all shadow-lg ${
              activeKey === "ArrowRight"
                ? "border-quinfall-gold bg-quinfall-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                : "border-white/20 group-hover:border-white/60"
            }`}
          >
            <FaChevronRight
              className={`w-6 h-6 md:w-8 md:h-8 ${
                activeKey === "ArrowRight" ? "text-quinfall-gold" : "text-white"
              }`}
            />

            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black border border-white/20 rounded text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Right
            </div>
          </div>
          <span className="hidden md:block text-[10px] font-serif font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
            Next
          </span>
        </button>
      </div>

      <div className="absolute bottom-56 left-20 z-30 max-w-xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-sm text-[#c9a858]">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="h-px w-12 bg-white/40" />
          <span className="font-mono text-sm text-white/40">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <motion.h3
          key={currentImage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-4xl font-bold tracking-wide text-white drop-shadow-xl md:text-6xl"
        >
          {currentImage.title}
        </motion.h3>
      </div>

      <div className="absolute bottom-0 z-30 flex w-full">
        {thumbnails.map((thumb) => {
          const isActive = thumb.id === currentImage.id;

          return (
            <button
              key={thumb.id}
              onClick={() =>
                setCurrentIndex(images.findIndex((i) => i.id === thumb.id))
              }
              className={`relative h-28 flex-1 overflow-hidden transition-all md:h-36 cursor-pointer ${
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={thumb.src}
                alt={thumb.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              {!isActive && (
                <div className="absolute inset-0 bg-black/40 transition" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
