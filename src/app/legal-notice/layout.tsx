import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal Notice",
    description: "Legal and corporate information related to The Quinfall. Read our legal notices and trademark information.",
    openGraph: {
        title: "The Quinfall | Legal Notice",
        description: "Legal and corporate information related to The Quinfall.",
        type: "website",
    },
};

export default function LegalNoticeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
