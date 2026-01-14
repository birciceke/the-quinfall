"use client";

import { FiChevronDown } from "react-icons/fi";

interface AccordionSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

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
                    className={`text-2xl font-serif transition-colors ${isOpen ? "text-[#c9a858]" : "text-white group-hover:text-[#c9a858]"
                        }`}
                >
                    {title}
                </h3>

                <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#c9a858]" : "text-gray-500"
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 pt-2 text-gray-300 font-sans leading-relaxed border-t border-white/10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionSection;
