import { FaCompass, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#c9a858]/5 via-black to-black opacity-50" />
      <div className="absolute inset-0 bg-black/20 animate-pulse-slow pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl animate-fade-in-up">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-[#c9a858]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />
          <div className="relative border border-white/10 p-8 rounded-full bg-black/50 backdrop-blur-sm">
            <FaCompass className="w-16 h-16 md:w-24 md:h-24 text-gray-500  animate-[spin_10s_linear_infinite]" />
          </div>
        </div>

        <h1 className="mb-12 font-serif text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 tracking-widest leading-none select-none drop-shadow-2xl">
          404
        </h1>

        <h2 className="font-serif text-2xl md:text-3xl text-[#c9a858] tracking-[0.3em] uppercase mb-4">
          Lost in the Mist
        </h2>

        <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
          The path you seek has been consumed by the void or never existed in
          this realm.
        </p>

        <Link
          to="/"
          className="flex items-center gap-3 px-8 py-3 border border-white/30 hover:border-[#c9a858] hover:text-[#c9a858] text-white transition-all uppercase tracking-widest text-sm font-bold cursor-pointer group"
        >
          <FaArrowLeft />
          Step Back into The Quinfall
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
