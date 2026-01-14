import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Admin Dashboard for The Quinfall - Manage news, subscriptions, and site settings.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
