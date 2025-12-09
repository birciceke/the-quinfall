import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { FaSteam, FaTwitch, FaGift } from "react-icons/fa";

import LOGO from "../assets/images/logo.png";
import MAIN_BG from "../assets/images/main-bg.jpg";
import BG_TEST from "../assets/images/bg-test.jpg";

import Footer from "../components/Footer";

const STORAGE_KEY = "userAuthData";
const API_BASE = import.meta.env.VITE_API_URL || "";
axios.defaults.withCredentials = true;

const TwitchDropsPage = () => {
  const [steamLinked, setSteamLinked] = useState(false);
  const [twitchLinked, setTwitchLinked] = useState(false);
  const [rewardsCollected, setRewardsCollected] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [collectCooldown, setCollectCooldown] = useState(0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const saveAuthData = (data: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Auth save error", e);
    }
  };
  const loadAuthData = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Auth load error", e);
      return {};
    }
  };
  const clearAuthData = () => localStorage.removeItem(STORAGE_KEY);

  useEffect(() => {
    const steamId = searchParams.get("steamId");
    if (steamId) {
      const usernameParam = searchParams.get("username") || "";
      const twitchLinkedParam = searchParams.get("twitchLinked") === "true";
      const twitchUsernameParam = searchParams.get("twitchUsername") || "";

      setSteamLinked(true);
      setTwitchLinked(twitchLinkedParam);

      saveAuthData({
        steamLinked: true,
        username: usernameParam,
        twitchLinked: twitchLinkedParam,
        twitchUsername: twitchUsernameParam,
      });

      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    const stored = loadAuthData();
    if (stored.steamLinked) {
      setSteamLinked(true);
      if (stored.twitchLinked) {
        setTwitchLinked(true);
      }
    } else clearAuthData();
  }, []);

  const handleSteamLogin = () => {
    clearAuthData();
    window.location.href = `${API_BASE}/steam/auth`;
  };
  const handleSteamLogout = () => {
    clearAuthData();
    window.location.href = `${API_BASE}/steam/logout`;
  };
  const handleTwitchLogin = () => {
    if (!steamLinked) return;
    window.location.href = `${API_BASE}/twitch/auth`;
  };
  const handleTwitchLogout = () => {
    const stored = loadAuthData();
    const updated = { ...stored, twitchLinked: false, twitchUsername: "" };
    saveAuthData(updated);
    setTwitchLinked(false);
    window.location.href = `${API_BASE}/twitch/logout`;
  };

  const handleCollectRewards = async () => {
    if (!steamLinked || !twitchLinked || collectCooldown > 0) return;
    setRewardMessage("");
    setAlertMessage("");
    try {
      const resp = await fetch(`${API_BASE}/twitch/collect`, {
        method: "POST",
        credentials: "include",
      });
      const json = await resp.json();
      if (json.success) {
        setRewardsCollected(true);
        setRewardMessage(
          "Your Twitch reward has been found and will be credited to your game account shortly!"
        );
        setAlertMessage("");
      } else {
        setAlertMessage(json.message || "No rewards available.");
        setRewardMessage("");
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("Server error. Try again later.");
      setRewardMessage("");
    } finally {
      setCollectCooldown(10);
      const interval = setInterval(() => {
        setCollectCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const Card = ({
    type,
    step,
  }: {
    type: "steam" | "twitch" | "reward";
    step: number;
  }) => {
    let title = "",
      desc = "",
      btnText = "",
      btnAction = () => {},
      disabled = false;
    let icon: ReactNode;

    if (
      (type === "twitch" && !steamLinked) ||
      (type === "reward" && (!steamLinked || !twitchLinked))
    ) {
      disabled = true;
    }

    if (type === "steam") {
      if (steamLinked) {
        title = "Welcome!";
        desc =
          "Congratulations! You have successfully linked your Steam account.";
        btnText = "Log Out";
      } else {
        title = "Sign in to your Steam account!";
        desc =
          "Sign in with your Steam account to continue and unlock rewards.";
        btnText = "Sign In with Steam";
      }
      btnAction = steamLinked ? handleSteamLogout : handleSteamLogin;
      icon = <FaSteam className="mr-2 text-xl" />;
    }

    if (type === "twitch") {
      if (twitchLinked) {
        title = "Welcome!";
        desc = "Your Twitch account is successfully linked.";
        btnText = "Log Out";
      } else {
        title = "Sign in to your Twitch account!";
        desc =
          "Connect your Twitch account to receive exclusive in-game rewards.";
        btnText = "Sign In with Twitch";
      }
      btnAction = twitchLinked ? handleTwitchLogout : handleTwitchLogin;
      icon = <FaTwitch className="mr-2 text-xl" />;
    }

    if (type === "reward") {
      title = "Did you win your rewards? Check now!";
      desc =
        "You’ve completed all steps! Check if drops have been awarded to your account.";

      btnText =
        collectCooldown > 0
          ? `Wait ${collectCooldown} second(s).`
          : "Check Rewards";

      btnAction = handleCollectRewards;
      icon = <FaGift className="mr-2 text-xl" />;

      disabled =
        !(steamLinked && twitchLinked) ||
        rewardsCollected ||
        collectCooldown > 0;
    }

    return (
      <motion.div
        layout
        className="flex w-full rounded-xs border border-gray-700 bg-black/60 shadow-lg p-6 hover:shadow-2xl transition-shadow items-center"
      >
        <div className="flex flex-col items-center justify-center w-24 text-center pr-6 border-r border-gray-600">
          <p className="text-gray-400 text-sm uppercase">Step</p>
          <p className="text-5xl font-extrabold text-[#c9a858]">{step}</p>
        </div>

        <div className="flex flex-col flex-1 justify-center pl-6 gap-3">
          <p className="text-lg font-bold text-white">{title}</p>
          <p className="text-gray-300 text-sm">{desc}</p>
          <button
            onClick={btnAction}
            disabled={disabled}
            className={`flex items-center justify-center px-6 py-3 rounded font-semibold transition-colors cursor-pointer max-w-xs w-full ${
              disabled
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#c9a858] hover:bg-[#ac8a38] text-black"
            }`}
          >
            {icon}
            {btnText}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-24">
        <img
          src={MAIN_BG}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-6 py-12 rounded-xs shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-[#c9a858]/30 flex flex-col items-center gap-6 overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={BG_TEST}
              alt="background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 w-full flex flex-col items-center gap-6">
            <img
              src={LOGO}
              alt="Logo"
              className="mx-auto w-32 mb-6 opacity-95 cursor-pointer"
              onClick={() => navigate("/")}
            />

            <h1 className="text-5xl font-extrabold text-[#c9a858] text-center drop-shadow-lg">
              Link Your Accounts and Claim Your Rewards!
            </h1>
            <p className="text-center text-gray-300 text-lg mb-4">
              To receive rewards, you must first link your accounts!
            </p>

            {(alertMessage || rewardMessage) && (
              <div
                className={`w-full p-4 mb-4 font-semibold rounded-xs text-center ${
                  rewardMessage
                    ? "bg-[#59be45] text-white"
                    : "bg-[#b12727] text-white"
                }`}
              >
                {rewardMessage ? <>{rewardMessage}</> : alertMessage}
              </div>
            )}

            <Card type="steam" step={1} />
            <Card type="twitch" step={2} />
            <Card type="reward" step={3} />
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default TwitchDropsPage;
