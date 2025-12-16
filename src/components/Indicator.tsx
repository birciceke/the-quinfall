import { motion } from "framer-motion";
import { PiDiamondDuotone, PiDiamondFill } from "react-icons/pi";

interface IndicatorProps {
  currentSection: "home" | "gallery" | "news";
  onChangeSection: (section: "home" | "gallery" | "news") => void;
}

const Indicator = ({ currentSection, onChangeSection }: IndicatorProps) => {
  const sections: ("home" | "gallery" | "news")[] = ["home", "gallery", "news"];

  return (
    <div
      className="
    fixed
    left-8 md:left-20
    top-1/2
    -translate-y-1/2
    flex flex-col gap-5
    z-50
  "
    >
      {sections.map((section) => {
        const isActive = currentSection === section;

        return (
          <motion.button
            key={section}
            onClick={() => onChangeSection(section)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center group cursor-pointer"
          >
            {isActive ? (
              <PiDiamondFill
                size={18}
                strokeWidth={2.2}
                className="text-[#c9a858] drop-shadow-[0_0_6px_#c9a858]"
              />
            ) : (
              <PiDiamondDuotone
                size={18}
                strokeWidth={2}
                className="text-white/60 group-hover:text-[#c9a858] transition-colors duration-300"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Indicator;
