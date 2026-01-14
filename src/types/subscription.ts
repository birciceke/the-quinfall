export type Subscription = {
    _id: string;
    email: string;
    status: "Active" | "Inactive";
    createdAt: string;
    updatedAt: string;
};
