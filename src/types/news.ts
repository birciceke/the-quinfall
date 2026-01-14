export type News = {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    category: "Update" | "Community" | "Event" | "Other";
    createdAt: string;
    updatedAt: string;
};
