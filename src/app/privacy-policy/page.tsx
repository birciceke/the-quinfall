"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import AccordionSection from "@/components/AccordionSection";
import Footer from "@/components/Footer";

const POLICY_LAST_UPDATED = new Date(
    process.env.NEXT_PUBLIC_POLICY_LAST_UPDATED || "2026-01-01"
).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default function PrivacyPolicyPage() {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <>
            <section
                className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-20 py-20 md:py-24"
                style={{
                    backgroundImage: "url('/images/backgrounds/bg-general.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/70" />
                <motion.div
                    initial={{ opacity: 0, filter: "blur(16px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative max-w-4xl w-full bg-black/70 border border-white/20 shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8 md:gap-10"
                >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

                    <div className="text-center space-y-4">
                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-white">
                            <span className="text-[#c9a858]">Privacy</span> Policy
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base font-sans">
                            How we protect your data in The Quinfall?
                        </p>
                    </div>

                    {/* Decorative line */}
                    <div className="w-full flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="w-2 h-2 rotate-45 border border-[#c9a858]/50 bg-[#c9a858]/10" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                        <AccordionSection
                            title="1. Data Collection"
                            isOpen={openSection === 0}
                            onToggle={() => toggleSection(0)}
                        >
                            <p>
                                Vawraek Technology (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects information to
                                provide better services to all our players. This includes basic
                                information like your email address and game performance data, as
                                well as more complex information such as items traded within The
                                Quinfall marketplace.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="2. Usage of Information"
                            isOpen={openSection === 1}
                            onToggle={() => toggleSection(1)}
                        >
                            <p>
                                We use the information we collect from our services to provide,
                                maintain, protect, and improve them, develop new features, and
                                ensure the security of our players and systems.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="3. Information Sharing"
                            isOpen={openSection === 2}
                            onToggle={() => toggleSection(2)}
                        >
                            <p>
                                We do not share personal information with companies,
                                organizations, or individuals outside of Vawraek Technology except
                                with your consent, for external processing, or when legally
                                required.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="4. Data Security"
                            isOpen={openSection === 3}
                            onToggle={() => toggleSection(3)}
                        >
                            <p>
                                We implement industry-standard security measures to protect your
                                data from unauthorized access, alteration, disclosure, or
                                destruction. This includes encryption, secure storage practices,
                                and regular security reviews.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="5. Cookie Policy"
                            isOpen={openSection === 4}
                            onToggle={() => toggleSection(4)}
                        >
                            <p>
                                The Quinfall uses cookies and similar technologies to enhance user
                                experience, analyze gameplay behavior, and maintain secure
                                sessions. Cookies may include authentication tokens, preference
                                settings, and analytics identifiers.
                            </p>

                            <p className="mt-4">
                                You can control or disable cookies through your browser settings.
                                However, disabling cookies may affect certain features of the game
                                and website.
                            </p>
                        </AccordionSection>

                        <div className="p-4 sm:p-5 md:p-6 bg-[#c9a858]/5 border-l-2 border-[#c9a858] text-xs sm:text-sm italic text-gray-400">
                            This policy was last updated on {POLICY_LAST_UPDATED}. Vawraek
                            Technology reserves the right to update, amend, or modify this
                            policy at any time without prior notice.
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </>
    );
}
