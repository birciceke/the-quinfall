import { Link } from "react-router";

import LOGO from "../../assets/images/logo.png";

const Footer = () => {
  const links = [
    { name: "Support Center", path: "/support" },
    { name: "Wiki", path: "/wiki" },
    { name: "Drops", path: "/drops" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  return (
    <footer className="relative w-full bg-black text-white py-16 flex flex-col items-center gap-6">
      <img
        src={LOGO}
        alt="The Quinfall Logo"
        className="w-32 md:w-40 object-contain select-none"
        draggable={false}
      />

      <p className="text-sm text-gray-400">
        © 2025 Vawraek Corp., All rights reserved.
      </p>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-[#c9a858]">
        {links.map((item, i) => (
          <Link key={i} to={item.path} className="hover:text-white transition">
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
