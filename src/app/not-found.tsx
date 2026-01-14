"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <>
            <section
                className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden"
                style={{
                    backgroundImage: `url('/images/backgrounds/bg-not-found.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <motion.div
                    initial={{ opacity: 0, filter: "blur(16px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative z-10 flex flex-col items-center text-center max-w-2xl text-white"
                >
                    <h1 className="mb-6 font-serif text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-widest leading-none select-none drop-shadow-2xl">
                        404
                    </h1>

                    <h2 className="font-serif text-2xl md:text-3xl text-[#c9a858] tracking-[0.3em] uppercase mb-4">
                        Lost in the Mist
                    </h2>

                    <p className="font-sans text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-md">
                        The path you seek has been consumed by the void or never existed in
                        this realm.
                    </p>

                    <Link
                        href="/"
                        className="px-8 py-3 bg-[#c9a858] text-black hover:bg-white transition-all duration-200 uppercase tracking-widest text-sm font-bold cursor-pointer"
                    >
                        Return to The Quinfall
                    </Link>
                </motion.div>
            </section>
            <Footer />
        </>
    );
}
