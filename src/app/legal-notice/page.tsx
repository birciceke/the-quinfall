"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import AccordionSection from "@/components/AccordionSection";
import Footer from "@/components/Footer";

const NOTICE_LAST_UPDATED = new Date(
    process.env.NEXT_PUBLIC_NOTICE_LAST_UPDATED || "2026-01-01"
).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default function LegalNoticePage() {
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
                            <span className="text-[#c9a858]">Legal</span> Notice
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base font-sans">
                            Legal and corporate information related to The Quinfall.
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
                            title="1. Corporate Information"
                            isOpen={openSection === 0}
                            onToggle={() => toggleSection(0)}
                        >
                            <p>
                                The Quinfall is developed and published by Vawraek Technology.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="2. Intellectual Property"
                            isOpen={openSection === 1}
                            onToggle={() => toggleSection(1)}
                        >
                            <p>
                                All content on this website, including but not limited to text,
                                graphics, logos, images, audio clips, digital downloads, data
                                compilations, and software, is the property of Vawraek Technology
                                or its content suppliers and is protected by international
                                copyright laws.
                            </p>

                            <p className="mt-4">
                                The compilation of all content on this site is the exclusive
                                property of Vawraek Technology, with copyright authorship for this
                                collection by Vawraek Technology, and protected by international
                                copyright laws.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="3. Trademarks"
                            isOpen={openSection === 2}
                            onToggle={() => toggleSection(2)}
                        >
                            <p>
                                &quot;The Quinfall,&quot; &quot;Vawraek,&quot; and other marks indicated on our site
                                are registered trademarks of Vawraek Technology. Vawraek
                                Technology&apos;s trademarks and trade dress may not be used in
                                connection with any product or service that is not Vawraek
                                Technology&apos;s, in any manner that is likely to cause confusion
                                among customers, or in any manner that disparages or discredits
                                Vawraek Technology.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="4. Disclaimer of Liability"
                            isOpen={openSection === 3}
                            onToggle={() => toggleSection(3)}
                        >
                            <p>
                                The materials on Vawraek Technology&apos;s website are provided on an
                                &apos;as is&apos; basis. Vawraek Technology makes no warranties, expressed
                                or implied, and hereby disclaims and negates all other warranties
                                including, without limitation, implied warranties or conditions of
                                merchantability, fitness for a particular purpose, or
                                non-infringement of intellectual property or other violation of
                                rights.
                            </p>
                        </AccordionSection>

                        <AccordionSection
                            title="5. Governing Law"
                            isOpen={openSection === 4}
                            onToggle={() => toggleSection(4)}
                        >
                            <p>
                                Any claim relating to Vawraek Technology&apos;s website shall be
                                governed by the laws of the jurisdiction in which the company is
                                headquartered without regard to its conflict of law provisions.
                            </p>
                        </AccordionSection>

                        <div className="p-4 sm:p-5 md:p-6 bg-[#c9a858]/5 border-l-2 border-[#c9a858] text-xs sm:text-sm italic text-gray-400">
                            This notice was last updated on {NOTICE_LAST_UPDATED}. Vawraek
                            Technology reserves the right to update, amend, or modify this
                            notice at any time without prior notice.
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </>
    );
}
