import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import ENTRANCE_VIDEO from "../assets/videos/entrance.mp4";
import STEAM_LOGO from "../assets/images/logos/steam-logo.png";
import PLAY_BG from "../assets/images/others/play-bg.png";
import PLAY_FIRE from "../assets/images/others/play-fire.png";
import PLAY_SHADOW from "../assets/images/others/play-shadow.png";
import PLAY_BUTTON from "../assets/images/others/play-button.png";

const Home = () => {
  const title = "THE QUINFALL";
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={ENTRANCE_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/70" />

      <div className="relative z-10 flex flex-col items-center justify-between h-full text-center text-white px-4 md:px-16 max-w-5xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center grow">
          <motion.h1
            className="
            font-bold text-white
            text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem]
            tracking-[0.15em] md:tracking-[0.2em]
            drop-shadow-[0_0_25px_rgba(0, 0, 0, 1)]
            [text-shadow:_0_0_20px_rgba(0, 0, 0, 1),_0_0_40px_rgba(0, 0, 0, 1)]
            leading-[1.05] mb-4 whitespace-nowrap
          "
          >
            {title.split("").map((char, index) => {
              const randomDelay = Math.random() * 1.2;
              return (
                <motion.span
                  key={index}
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

          <div className="relative flex flex-col items-center justify-center mb-8 w-full h-60 md:h-80">
            <motion.img
              src={PLAY_SHADOW}
              alt="Play Shadow"
              className="absolute w-80 md:w-100 select-none opacity-80 z-10 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            />

            <motion.img
              src={PLAY_BG}
              alt="Play Background"
              className="absolute w-80 md:w-100 select-none z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            />

            <motion.img
              src={PLAY_FIRE}
              alt="Play Fire"
              className="absolute w-80 md:w-100 select-none z-30 pointer-events-none"
              style={{ transformOrigin: "center bottom" }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeInOut" }}
            />

            <motion.button
              className="absolute w-64 md:w-80 z-50 cursor-pointer"
              onClick={() => setShowTrailer(true)}
              whileHover={{
                scale: 1.5,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.4 },
              }}
              initial={{ opacity: 0, x: -50, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={PLAY_BUTTON}
                alt="Play Button"
                className="w-full h-auto select-none pointer-events-auto"
                draggable={false}
              />
            </motion.button>

            <motion.span
              className="mt-90 text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-white select-none z-40"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              Watch Trailer
            </motion.span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-end pb-8">
          <motion.span
            className="text-xl sm:text-2xl font-semibold tracking-wider mb-4 uppercase"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            Wishlist Now
          </motion.span>

          <motion.a
            href="https://store.steampowered.com/app/2294660/The_Quinfall/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 border border-[#c9a858]/60 px-6 py-2  transition [clip-path:polygon(18px_0%,100%_0%,100%_calc(100%-18px),calc(100%-18px)_100%,0%_100%,0%_18px)]"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <img
              src={STEAM_LOGO}
              alt="Steam Logo"
              className="w-28 opacity-90 hover:opacity-100 transition"
            />
          </motion.a>
        </div>
      </div>

      <AnimatePresence>
        {showTrailer && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-[92%] max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTrailer(false)}
                className="
            absolute -top-15 right-0
            text-[#c9a858] border border-[#c9a858]/60 w-10 h-10 
            flex items-center justify-center 
            hover:bg-black/60
            cursor-pointer 
            transition
            backdrop-blur-sm
            shadow-md
          "
              >
                <motion.span
                  whileHover={{
                    rotate: 90,
                    transition: { type: "spring", stiffness: 250, damping: 10 },
                  }}
                  className="inline-block text-2xl leading-none"
                >
                  <FaTimes />
                </motion.span>
              </button>

              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/6SC_JO-xecU?autoplay=1"
                title="The Quinfall Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="shadow-2xl"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;
