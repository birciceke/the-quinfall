import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { Subscription } from "../../types/subscription";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSubscriptions = createAsyncThunk(
    "subscription/fetch",
    async (_, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.get(`${API_URL}/subscription`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Server unreachable. Failed to fetch subscriptions."
            );
        }
    }
);

export const createSubscription = createAsyncThunk(
    "subscription/create",
    async (subscriptionData: Partial<Subscription>, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.post(
                `${API_URL}/subscription`,
                subscriptionData
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to create subscription!"
            );
        }
    }
);

export const toggleSubscriptionStatus = createAsyncThunk(
    "subscription/toggle",
    async (_id: string, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.put(`${API_URL}/subscription/${_id}`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Failed to update subscription status!"
            );
        }
    }
);

export const deleteSubscription = createAsyncThunk(
    "subscription/delete",
    async (_id: string, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            await axios.delete(`${API_URL}/subscription/${_id}`);
            return _id;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to delete subscription!"
            );
        }
    }
);

type InitialState = {
    data: Subscription[];
    isLoading: boolean;
    error: string | null;
};

const initialState: InitialState = {
    data: [],
    isLoading: false,
    error: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(createSubscription.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data.push(action.payload);
            })
            .addCase(createSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleSubscriptionStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleSubscriptionStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.data.findIndex(
                    (item) => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(toggleSubscriptionStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteSubscription.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSubscription.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = state.data.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteSubscription.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default subscriptionSlice.reducer;
