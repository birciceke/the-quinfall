import type { ObjectId } from "mongoose";

type News = {
  _id: ObjectId;
  title: string;
  content: string;
  createdAt: Date;
};
