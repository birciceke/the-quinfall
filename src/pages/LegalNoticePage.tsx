import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const NOTICE_LAST_UPDATED = new Date(
  import.meta.env.VITE_NOTICE_LAST_UPDATED
).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="border border-white/10 bg-white/5 transition-all duration-200 hover:border-[#c9a858]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group cursor-pointer"
      >
        <h3
          className={`text-2xl font-serif transition-colors ${
            isOpen ? "text-[#c9a858]" : "text-white group-hover:text-[#c9a858]"
          }`}
        >
          {title}
        </h3>

        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#c9a858]" : "text-gray-500"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 text-gray-300 font-sans leading-relaxed border-t border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
};

const LegalNoticePage: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-20 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, filter: "blur(16px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative max-w-4xl w-full bg-black/70 border border-white/20 shadow-2xl p-8 md:p-12 flex flex-col gap-10"
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a858]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a858]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a858]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a858]" />

        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-widest uppercase text-white">
            <span className="text-[#c9a858]">Legal</span> Notice
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-sans">
            Legal and corporate information related to The Quinfall.
          </p>
        </div>

        <div className="flex flex-col gap-6">
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
              "The Quinfall," "Vawraek," and other marks indicated on our site
              are registered trademarks of Vawraek Technology. Vawraek
              Technology's trademarks and trade dress may not be used in
              connection with any product or service that is not Vawraek
              Technology's, in any manner that is likely to cause confusion
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
              The materials on Vawraek Technology's website are provided on an
              'as is' basis. Vawraek Technology makes no warranties, expressed
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
              Any claim relating to Vawraek Technology's website shall be
              governed by the laws of the jurisdiction in which the company is
              headquartered without regard to its conflict of law provisions.
            </p>
          </AccordionSection>

          <div className="p-6 bg-[#c9a858]/5 border-l-2 border-[#c9a858] text-sm italic text-gray-400">
            This notice was last updated on {NOTICE_LAST_UPDATED}. Vawraek
            Technology reserves the right to update, amend, or modify this
            notice at any time without prior notice.
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LegalNoticePage;
