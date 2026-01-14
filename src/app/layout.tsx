import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Quinfall | Official Website",
    template: "The Quinfall | %s",
  },
  icons: {
    icon: "/favicon.png",
  },
  description: "The Quinfall is an upcoming MMORPG developed by Vawraek Technology. Explore a vast fantasy world, engage in epic battles, and join a thriving community.",
  keywords: ["The Quinfall", "MMORPG", "Vawraek", "fantasy game", "online game", "RPG"],
  authors: [{ name: "Vawraek Technology" }],
  creator: "Vawraek Technology",
  publisher: "Vawraek Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quinfall.com",
    siteName: "The Quinfall",
    title: "The Quinfall | Official Website",
    description: "The Quinfall is an upcoming MMORPG developed by Vawraek Technology. Explore a vast fantasy world, engage in epic battles, and join a thriving community.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Quinfall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Quinfall | Official Website",
    description: "The Quinfall is an upcoming MMORPG developed by Vawraek Technology.",
    images: ["/og-image.jpg"],
    creator: "@quinfall",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "The Quinfall",
    "description": "The Quinfall is an upcoming MMORPG developed by Vawraek Technology. Explore a vast fantasy world, engage in epic battles, and join a thriving community.",
    "genre": ["MMORPG", "Fantasy", "Action RPG"],
    "gamePlatform": ["PC"],
    "publisher": {
      "@type": "Organization",
      "name": "Vawraek Technology",
      "url": "https://quinfall.com"
    },
    "developer": {
      "@type": "Organization",
      "name": "Vawraek Technology"
    },
    "url": "https://quinfall.com",
    "image": "https://quinfall.com/og-image.jpg",
    "applicationCategory": "Game"
  };

  return (
    <html lang="en" className={ebGaramond.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-black text-white font-serif">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

