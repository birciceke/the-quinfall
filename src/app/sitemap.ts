import { MetadataRoute } from 'next'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://quinfall.com'

interface NewsItem {
    _id: string
    title: string
    createdAt: string
    updatedAt?: string
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${SITE_URL}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/twitch-drops`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/legal-notice`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]

    let newsPages: MetadataRoute.Sitemap = []

    try {
        const response = await fetch(`${API_BASE}/news`, {
            next: { revalidate: 3600 },
        })

        if (response.ok) {
            const newsData: NewsItem[] = await response.json()
            newsPages = newsData.map((news) => ({
                url: `${SITE_URL}/news/${slugify(news.title)}-${news._id}`,
                lastModified: new Date(news.updatedAt || news.createdAt),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        }
    } catch (error) {
        console.error('Sitemap: Failed to fetch news', error)
    }

    return [...staticPages, ...newsPages]
}
