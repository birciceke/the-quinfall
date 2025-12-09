import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./sections/Home";
import Gallery from "./sections/Gallery";
import News from "./sections/News";
import NewsletterPage from "./pages/NewsletterPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ErrorPage from "./pages/ErrorPage";

import Header from "./components/Header";
import DiscordInvite from "./components/DiscordInvite";
import Indicator from "./components/Indicator";
import CookieBanner from "./components/CookieBanner";
import TwitchDropsPage from "./pages/TwitchDropsPage";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");

  // 🔥 NEWS → Footer görünürken scroll lock
  const [allowSectionScroll, setAllowSectionScroll] = useState(true);

  const handleScroll = (e) => {
    if (!allowSectionScroll) return;
    if (isAnimating) return;

    const sections = ["home", "gallery", "news"];
    const currentIndex = sections.indexOf(currentSection);

    if (e.deltaY > 50 && currentIndex < sections.length - 1) {
      setScrollDirection("down");
      setIsAnimating(true);
      setCurrentSection(sections[currentIndex + 1]);
      setTimeout(() => setIsAnimating(false), 450);
    }

    if (e.deltaY < -50 && currentIndex > 0) {
      setScrollDirection("up");
      setIsAnimating(true);
      setCurrentSection(sections[currentIndex - 1]);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection, isAnimating, allowSectionScroll]);

  // 🔥 YENİ HIZLI FADE ANİMASYONU
  const variants = {
    enter: {
      opacity: 0,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.02,
    },
  };

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Home />;
      case "gallery":
        return <Gallery />;
      case "news":
        return <News onScrollLockChange={setAllowSectionScroll} />;
      default:
        return <Home />;
    }
  };

  const goToSection = (targetSection) => {
    if (isAnimating) return;

    const sections = ["home", "gallery", "news"];
    const currentIndex = sections.indexOf(currentSection);
    const targetIndex = sections.indexOf(targetSection);

    if (targetIndex === currentIndex) return;

    setScrollDirection(targetIndex > currentIndex ? "down" : "up");

    setIsAnimating(true);
    setCurrentSection(targetSection);

    setTimeout(() => setIsAnimating(false), 450);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative overflow-hidden h-screen w-full bg-black text-white">
              <Header />
              <DiscordInvite />

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
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative inset-0"
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>

              <CookieBanner />
            </div>
          }
        />

        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/drops" element={<TwitchDropsPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
