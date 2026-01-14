"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import MaintenanceWrapper from "@/components/MaintenanceWrapper";

export function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <MaintenanceWrapper>{children}</MaintenanceWrapper>
        </Provider>
    );
}
