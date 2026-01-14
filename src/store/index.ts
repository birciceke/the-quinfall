import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./slices/news";
import subscriptionReducer from "./slices/subscription";
import maintenanceReducer from "./slices/maintenance";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        subscription: subscriptionReducer,
        maintenance: maintenanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
