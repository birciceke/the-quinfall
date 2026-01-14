import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Twitch Drops",
    description: "Link your Steam and Twitch accounts to claim exclusive in-game rewards through Twitch Drops for The Quinfall.",
    openGraph: {
        title: "The Quinfall | Twitch Drops",
        description: "Link your Steam and Twitch accounts to claim exclusive in-game rewards through Twitch Drops.",
        type: "website",
    },
};

export default function TwitchDropsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
