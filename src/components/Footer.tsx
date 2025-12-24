import { Link } from "react-router";

import THE_QUINFALL_LOGO_ALT from "../assets/images/logos/the-quinfall-logo-alt.png";
import VAWRAEK_LOGO_ALT from "../assets/images/logos/vawraek-logo-alt.png";

const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Support Center", path: "/support-center" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Twitch Drops", path: "/drops" },
    { name: "Wiki", path: "/wiki" },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 py-10 px-6 md:px-20 mt-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-8">
        <div className="w-40 flex justify-center md:justify-start">
          <Link to="/" className="w-40">
            <img
              src={THE_QUINFALL_LOGO_ALT}
              alt="The Quinfall Logo Alternate"
              className="w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              draggable="false"
            />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-sans tracking-wider">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                relative
                transition-all duration-200
                hover:text-[#c9a858]
              "
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="w-40 flex justify-center md:justify-end">
          <a
            href="http://vawraek.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-40"
          >
            <img
              src={VAWRAEK_LOGO_ALT}
              alt="Vawraek Technology Logo Alternate"
              className="w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              draggable="false"
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center border-t border-white/5 pt-8 text-gray-600 text-xs font-sans">
        <p>
          © {year} Vawraek Technology. All rights reserved. The Quinfall is a
          registered trademark of Vawraek Technology.
        </p>
        <p>Version: {APP_VERSION}</p>
      </div>
    </footer>
  );
};

export default Footer;
