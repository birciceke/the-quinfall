import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chronicles",
    description: "Explore the complete archives of The Quinfall. Stay informed about updates, events, and announcements from the realm.",
    openGraph: {
        title: "The Quinfall | Chronicles",
        description: "Explore the complete archives of The Quinfall. Stay informed about updates, events, and announcements from the realm.",
        type: "website",
    },
};

export default function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
