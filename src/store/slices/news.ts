import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { News } from "../../types/news";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchNews = createAsyncThunk(
    "news/fetch",
    async (_, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.get(`${API_URL}/news`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Server unreachable. Failed to fetch news."
            );
        }
    }
);

export const fetchNewsById = createAsyncThunk(
    "news/fetchById",
    async (_id: string, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.get(`${API_URL}/news/${_id}`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Server unreachable. Failed to fetch news."
            );
        }
    }
);

export const createNews = createAsyncThunk(
    "news/create",
    async (newsData: Partial<News>, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.post(`${API_URL}/news`, newsData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to create news!"
            );
        }
    }
);

export const updateNews = createAsyncThunk(
    "news/update",
    async (
        { _id, newsData }: { _id: string; newsData: Partial<News> },
        { rejectWithValue }
    ) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.put(`${API_URL}/news/${_id}`, newsData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to update news!"
            );
        }
    }
);

export const deleteNews = createAsyncThunk(
    "news/delete",
    async (_id: string, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            await axios.delete(`${API_URL}/news/${_id}`);
            return _id;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to delete news!"
            );
        }
    }
);

type InitialState = {
    data: News[];
    isLoading: boolean;
    error: string | null;
    currentData: News | null;
};

const initialState: InitialState = {
    data: [],
    isLoading: false,
    error: null,
    currentData: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchNewsById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.currentData = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.currentData = action.payload || null;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.currentData = null;
            })

            .addCase(createNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data.push(action.payload);
            })
            .addCase(createNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(updateNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.currentData = action.payload;

                const index = state.data.findIndex(
                    (item) => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = state.data.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = newsSlice.actions;
export default newsSlice.reducer;
