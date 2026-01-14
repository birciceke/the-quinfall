"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Home from "@/sections/Home";
import Gallery from "@/sections/Gallery";
import News from "@/sections/News";

import Header from "@/components/Header";
import Indicator from "@/components/Indicator";
import NewsletterModal from "@/components/NewsletterModal";
import CookieBanner from "@/components/CookieBanner";

type Section = "home" | "gallery" | "news";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const sections: Section[] = ["home", "gallery", "news"];

  const changeSection = (direction: "up" | "down") => {
    if (isAnimating) return;

    // İlk kaydırmada isInitialLoad'u false yap
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }

    const currentIndex = sections.indexOf(currentSection);

    if (direction === "down" && currentIndex < sections.length - 1) {
      setScrollDirection("down");
      setIsAnimating(true);
      setCurrentSection(sections[currentIndex + 1]);
      setTimeout(() => setIsAnimating(false), 450);
    }

    if (direction === "up" && currentIndex > 0) {
      setScrollDirection("up");
      setIsAnimating(true);
      setCurrentSection(sections[currentIndex - 1]);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  const handleScroll = (e: WheelEvent) => {
    if (isNewsletterOpen) return;
    if (currentSection === "news") return;

    if (e.deltaY > 50) changeSection("down");
    if (e.deltaY < -50) changeSection("up");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isNewsletterOpen) return;

    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
      changeSection("down");

    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W")
      changeSection("up");
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, isAnimating, isNewsletterOpen]);

  const variants = {
    enter: (direction: "up" | "down") => ({
      y: direction === "down" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: "0%",
      opacity: 1,
    },
    exit: (direction: "up" | "down") => ({
      y: direction === "down" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Home />;
      case "gallery":
        return <Gallery />;
      case "news":
        return <News onScrollTop={() => changeSection("up")} />;
      default:
        return <Home />;
    }
  };

  const goToSection = (targetSection: Section) => {
    if (isAnimating) return;

    const currentIndex = sections.indexOf(currentSection);
    const targetIndex = sections.indexOf(targetSection);

    if (currentIndex === targetIndex) return;

    setScrollDirection(targetIndex > currentIndex ? "down" : "up");
    setIsAnimating(true);
    setCurrentSection(targetSection);
    setTimeout(() => setIsAnimating(false), 450);
  };

  return (
    <div className="relative overflow-hidden h-screen w-full bg-black text-white">
      <Header onOpenNewsletter={() => setIsNewsletterOpen(true)} />

      <Indicator
        currentSection={currentSection}
        onChangeSection={goToSection}
      />

      <AnimatePresence mode="wait" custom={scrollDirection}>
        <motion.div
          key={currentSection}
          custom={scrollDirection}
          variants={variants}
          initial={isInitialLoad ? { opacity: 0, filter: "blur(20px)" } : "enter"}
          animate={isInitialLoad ? { opacity: 1, filter: "blur(0px)" } : "center"}
          exit="exit"
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
          onAnimationComplete={() => {
            if (isInitialLoad) setIsInitialLoad(false);
          }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      <CookieBanner />

      <AnimatePresence>
        {isNewsletterOpen && (
          <NewsletterModal
            isOpen={isNewsletterOpen}
            onClose={() => setIsNewsletterOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
