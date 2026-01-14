import type { Metadata } from "next";
import NewsDetailClient from "./NewsDetailClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thequinfall.com";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

async function getNews(slug: string): Promise<NewsItem | null> {
    const newsId = slug?.split("-").pop();
    if (!newsId) return null;

    try {
        const response = await fetch(`${API_BASE}/news/${newsId}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) return null;
        return response.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const news = await getNews(slug);

    if (!news) {
        return {
            title: "Chronicle Not Found",
            description: "The requested chronicle could not be found.",
        };
    }

    const description = news.content.slice(0, 160).trim() + (news.content.length > 160 ? "..." : "");
    const url = `${SITE_URL}/news/${slugify(news.title)}-${news._id}`;

    return {
        title: news.title,
        description,
        openGraph: {
            title: `The Quinfall | ${news.title}`,
            description,
            type: "article",
            url,
            images: [
                {
                    url: news.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: news.title,
                },
            ],
            publishedTime: news.createdAt,
            authors: ["Vawraek Technology"],
        },
        twitter: {
            card: "summary_large_image",
            title: news.title,
            description,
            images: [news.imageUrl],
        },
        alternates: {
            canonical: url,
        },
    };
}

export default function NewsDetailPage() {
    return <NewsDetailClient />;
}
