import { BrowserRouter as Router, Routes, Route } from "react-router";
import { lazy, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";

import Home from "./sections/Home";
import Gallery from "./sections/Gallery";
import News from "./sections/News";

const MainLayout = lazy(() => import("./layouts/MainLayout"));

const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const TwitchDropsPage = lazy(() => import("./pages/TwitchDropsPage"));

import Header from "./components/Header";
import Indicator from "./components/Indicator";
import NewsletterModal from "./components/NewsletterModal";
import CookieBanner from "./components/CookieBanner";
import GlobalLoader from "./components/GlobalLoader";

type Section = "home" | "gallery" | "news";

function App() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const sections: Section[] = ["home", "gallery", "news"];

  const changeSection = (direction: "up" | "down") => {
    if (isAnimating) return;

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
    if (e.deltaY > 50) changeSection("down");
    if (e.deltaY < -50) changeSection("up");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [currentSection, isAnimating]);

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
        return <News />;
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
    <Router>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route
            path="/"
            element={
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
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0"
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
            }
          />

          <Route element={<MainLayout />}>
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/drops" element={<TwitchDropsPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
