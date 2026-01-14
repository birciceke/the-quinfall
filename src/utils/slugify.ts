export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9ğüşöçı\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};
