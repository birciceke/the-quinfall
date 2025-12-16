import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { GALLERY_DATA } from "../data/gallery-data";

const images = GALLERY_DATA;

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const title = "GALLERY";

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleThumbnailClick = (clickedIndex: number) => {
    setIndex(clickedIndex);
  };

  const THUMBNAIL_COUNT = 8;
  const currentBlock = Math.floor(index / THUMBNAIL_COUNT);
  const start = currentBlock * THUMBNAIL_COUNT;
  const end = start + THUMBNAIL_COUNT;
  const thumbnails = images.slice(start, end);

  return (
    <section
      id="gallery"
      className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          draggable={false}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 2, ease: "easeInOut" },
          }}
        />
      </AnimatePresence>

      <div className="absolute top-20 z-20 text-center">
        <motion.h1
          className="font-bold text-white text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem]
          tracking-[0.15em] md:tracking-[0.2em]
          drop-shadow-[0_0_25px_rgba(0, 0, 0, 1)]
          [text-shadow:_0_0_20px_rgba(0, 0, 0, 1),_0_0_40px_rgba(0, 0, 0, 1)]
          leading-[1.05] mb-4 whitespace-nowrap"
        >
          {title.split("").map((char, i) => {
            const randomDelay = Math.random() * 1.2;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.2,
                    delay: randomDelay,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>

      <div className="absolute bottom-52 flex items-center justify-center gap-20 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={prevImage}
          className="p-1 rounded-xs border-2 border-[#c9a858]/70 hover:bg-black/60 transition cursor-pointer"
        >
          <ChevronLeft className="text-[#c9a858]" size={40} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={nextImage}
          className="p-1 rounded-xs border-2 border-[#c9a858]/70 hover:bg-black/60 transition cursor-pointer"
        >
          <ChevronRight className="text-[#c9a858]" size={40} />
        </motion.button>
      </div>

      <div className="absolute bottom-0 z-30 flex w-full">
        {thumbnails.map((thumb, i) => {
          const globalIndex = start + i;
          return (
            <motion.div
              key={i}
              onClick={() => handleThumbnailClick(globalIndex)}
              className={`relative flex-1 h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden cursor-pointer border-2 transition-all
          ${
            index === globalIndex ? "border-[#c9a858]/80" : "border-transparent"
          }`}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${globalIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 shadow-inner" />
            </motion.div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
    </section>
  );
};

export default Gallery;
