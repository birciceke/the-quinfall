import type { ObjectId } from "mongoose";

type News = {
  _id: ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  category: ["Update", "Community", "Event", "Other"];
  createdAt: Date;
  updatedAt: Date;
};
