import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { News } from "../../../types/news";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNews = createAsyncThunk("news/fetch", async () => {
  const response = await axios.get(`${API_URL}/news`);
  return response.data;
});

export const fetchNewsById = createAsyncThunk(
  "news/fetchById",
  async (_id: string) => {
    const response = await axios.get(`${API_URL}/news/${_id}`);
    return response.data;
  }
);

type InitialState = {
  data: News[];
  isLoading: boolean;
  error: boolean;
  currentData: News | null;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: false,
  currentData: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.currentData = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default newsSlice.reducer;
