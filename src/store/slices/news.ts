import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { News } from "../../types/news";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNews = createAsyncThunk("news/fetch", async () => {
  if (!API_URL) throw new Error("API URL is not defined!");

  const response = await axios.get(`${API_URL}/news`);
  return response.data;
});

export const fetchNewsById = createAsyncThunk(
  "news/fetchById",
  async (_id: string) => {
    if (!API_URL) throw new Error("API URL is not defined!");

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
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.currentData = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.currentData = action.payload || null;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.currentData = null;
      });
  },
});

export default newsSlice.reducer;
