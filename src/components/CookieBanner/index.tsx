import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900/95 text-white px-6 py-4 flex flex-col md:flex-row justify-evenly items-start md:items-center gap-4 z-9999 shadow-lg backdrop-blur-sm border-t border-white/10">
      <p className="text-sm md:text-base leading-relaxed max-w-3xl">
        We would like to point out that technically necessary cookies are used
        to fulfill the main functions of our website. The use of these cookies
        is a security and technical necessity for the correct operation of our
        website.{" "}
        <a
          href="/"
          className="text-[#c9a858] hover:text-[#ac8a38] transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click for Cookie Policy
        </a>
        .
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDecline}
          className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <X size={18} /> Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a858] text-black font-semibold rounded-xl hover:bg-[#ac8a38] transition-all duration-200 cursor-pointer"
        >
          <Check size={18} /> Accept
        </button>
      </div>
    </div>
  );
}
