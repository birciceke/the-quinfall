import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MaintenanceState {
    isActive: boolean;
    message: string;
    activatedAt: string | null;
    activatedBy: string | null;
    isLoading: boolean;
    error: string | null;
}

export const fetchMaintenanceStatus = createAsyncThunk(
    "maintenance/fetch",
    async (_, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.get(`${API_URL}/maintenance`);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Server unreachable. Failed to fetch maintenance status."
            );
        }
    }
);

export const toggleMaintenanceMode = createAsyncThunk(
    "maintenance/toggle",
    async (_, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}/maintenance/toggle`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message || "Failed to toggle maintenance mode!"
            );
        }
    }
);

export const updateMaintenanceMessage = createAsyncThunk(
    "maintenance/updateMessage",
    async (message: string, { rejectWithValue }) => {
        try {
            if (!API_URL) throw new Error("API URL is not defined!");

            const response = await axios.put(`${API_URL}/maintenance/message`, {
                message,
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            return rejectWithValue(
                err?.response?.data?.message ||
                "Failed to update maintenance message!"
            );
        }
    }
);

const initialState: MaintenanceState = {
    isActive: false,
    message:
        "We are currently performing scheduled maintenance. Please check back soon.",
    activatedAt: null,
    activatedBy: null,
    isLoading: false,
    error: null,
};

const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenanceStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMaintenanceStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isActive = action.payload.isActive;
                state.message = action.payload.message;
                state.activatedAt = action.payload.activatedAt;
                state.activatedBy = action.payload.activatedBy;
            })
            .addCase(fetchMaintenanceStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleMaintenanceMode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleMaintenanceMode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isActive = action.payload.isActive;
                state.activatedAt = action.payload.activatedAt;
                state.activatedBy = action.payload.activatedBy;
            })
            .addCase(toggleMaintenanceMode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(updateMaintenanceMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMaintenanceMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.message = action.payload.maintenanceMessage;
            })
            .addCase(updateMaintenanceMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default maintenanceSlice.reducer;
