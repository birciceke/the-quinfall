import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Vawraek Technology protects your data in The Quinfall. Read our privacy policy and data handling practices.",
    openGraph: {
        title: "The Quinfall | Privacy Policy",
        description: "Learn how Vawraek Technology protects your data in The Quinfall.",
        type: "website",
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
