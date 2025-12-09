import { motion } from "framer-motion";

import DISCORD_INVITE from "../../assets/images/discord-invite.png";

const DiscordInvite = () => {
  return (
    <motion.a
      href="https://discord.gg/N8TKtwJV"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      className="
        fixed top-784 right-16 z-40
        transition-transform duration-300 ease-out
        hover:scale-105 hover:brightness-110
      "
    >
      <img
        src={DISCORD_INVITE}
        alt="Join our Discord"
        className="w-32 md:w-40 drop-shadow-[0_0_15px_rgba(0, 0, 0, 1)]"
      />
    </motion.a>
  );
};

export default DiscordInvite;
