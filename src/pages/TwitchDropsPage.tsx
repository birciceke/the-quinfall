import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { FaSteam, FaTwitch, FaGift, FaLock } from "react-icons/fa";

const STORAGE_KEY = "userAuthData";
const API_BASE = import.meta.env.VITE_API_URL || "";

const TwitchDropsPage = () => {
  const [steamLinked, setSteamLinked] = useState(false);
  const [twitchLinked, setTwitchLinked] = useState(false);
  const [rewardsCollected, setRewardsCollected] = useState(false);
  const [collectCooldown, setCollectCooldown] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");

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
  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

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
      if (stored.twitchLinked) setTwitchLinked(true);
    } else clearAuthData();
  }, []);

  const handleSteamLogin = () => {
    clearAuthData();
    window.location.href = `${API_BASE}/steam/auth`;
  };
  const handleSteamLogout = () => {
    clearAuthData();
    setSteamLinked(false);
    window.location.href = `${API_BASE}/steam/logout`;
  };
  const handleTwitchLogin = () => {
    if (!steamLinked) return;
    window.location.href = `${API_BASE}/twitch/auth`;
  };
  const handleTwitchLogout = () => {
    const stored = loadAuthData();
    saveAuthData({ ...stored, twitchLinked: false, twitchUsername: "" });
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
          "Your Twitch reward has been credited to your game account!"
        );
      } else setAlertMessage(json.message || "No rewards available.");
    } catch {
      setAlertMessage("Server error. Try again later.");
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

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-20 bg-black/40 backdrop-blur-sm">
      <div className="relative max-w-5xl w-full bg-black/70 border border-white/20 shadow-2xl p-8 md:p-12 flex flex-col gap-8">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />
        <div className="text-center space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">
            Twitch Drops
          </h2>
          <p className="font-sans text-gray-400 text-sm md:text-base">
            To receive rewards, you must first link your accounts! Sign in with
            your Steam and Twitch accounts to continue your adventure and don’t
            miss out on exclusive rewards. If your accounts are linked to
            another profile, you can unlink them by signing in first.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center text-center border border-white/10 p-6 bg-black/50 relative group hover:border-white/30 transition-all duration-200">
            <div className="text-6xl font-serif text-white/10 absolute top-4 right-6 select-none group-hover:text-white/20 transition-colors">
              1
            </div>
            <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center shadow-lg border border-white/20 bg-gray-900">
              <FaSteam className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif uppercase">
              {steamLinked ? "Steam Connected" : "Steam Login"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {steamLinked
                ? "Your Steam account is successfully linked!"
                : "Connect your Steam account to verify ownership and enable reward collection."}
            </p>
            <button
              onClick={steamLinked ? handleSteamLogout : handleSteamLogin}
              className={`w-full py-3 px-4 font-bold tracking-wider uppercase text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                steamLinked
                  ? "bg-red-600 border border-red-500 text-white hover:bg-red-600"
                  : "bg-[#171a21] hover:bg-[#2a475e] text-white border border-white/20"
              }`}
            >
              {steamLinked ? "Logout" : "Connect Steam"}
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center text-center border border-white/10 p-6 bg-black/50 relative group hover:border-white/30 transition-all duration-200">
            <div className="text-6xl font-serif text-white/10 absolute top-4 right-6 select-none group-hover:text-white/20 transition-colors">
              2
            </div>
            <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center shadow-lg border border-white/20 bg-[#6441a5]">
              <FaTwitch className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif uppercase">
              {twitchLinked ? "Twitch Connected" : "Twitch Login"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {twitchLinked
                ? "Your Twitch account is successfully linked!"
                : "Connect your Twitch account to verify ownership and enable reward collection."}
            </p>
            <button
              onClick={twitchLinked ? handleTwitchLogout : handleTwitchLogin}
              disabled={!steamLinked}
              className={`w-full py-3 px-4 font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                twitchLinked
                  ? "bg-red-600 border border-red-500 text-white hover:bg-red-500 cursor-pointer"
                  : !steamLinked
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#6441a5] hover:bg-[#7d5bbe] text-white border border-white/20 cursor-pointer"
              }`}
            >
              {twitchLinked ? (
                "Logout"
              ) : !steamLinked ? (
                <>
                  <FaLock className="mr-2" /> Connect Twitch
                </>
              ) : (
                "Connect Twitch"
              )}
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center text-center border border-white/10 p-6 bg-black/50 relative group hover:border-white/30 transition-all duration-200">
            <div className="text-6xl font-serif text-white/10 absolute top-4 right-6 select-none group-hover:text-white/20 transition-colors">
              3
            </div>
            <div
              className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center shadow-lg border border-white/20 bg-yellow-500`}
            >
              <FaGift className={"w-8 h-8 text-white"} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif uppercase">
              Collect Rewards
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Claim your drops and check your in-game inventory.
            </p>
            <div className="w-full bg-black/60 p-2 rounded-md">
              <button
                onClick={handleCollectRewards}
                disabled={
                  !twitchLinked || rewardsCollected || collectCooldown > 0
                }
                className={`w-full py-3 px-4 font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                  rewardsCollected
                    ? "bg-transparent border border-yellow-500 text-yellow-500 cursor-not-allowed"
                    : !twitchLinked
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-400 cursor-pointer"
                }`}
              >
                {!twitchLinked && <FaLock className="mr-2" />}
                {rewardsCollected
                  ? "Rewards Claimed"
                  : `Claim Now${
                      collectCooldown > 0 ? ` (${collectCooldown}s)` : ""
                    }`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {(alertMessage || rewardMessage) && (
        <div className="absolute bottom-10 md:bottom-16 bg-black/70 text-white px-6 py-3 rounded-md">
          {rewardMessage || alertMessage}
        </div>
      )}
    </section>
  );
};

export default TwitchDropsPage;
