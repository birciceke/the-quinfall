"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store";
import { fetchMaintenanceStatus } from "@/store/slices/maintenance";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";

interface MaintenanceWrapperProps {
    children: React.ReactNode;
}

const MaintenanceWrapper = ({ children }: MaintenanceWrapperProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();

    const { isActive, message } = useSelector(
        (state: RootState) => state.maintenance
    );

    useEffect(() => {
        dispatch(fetchMaintenanceStatus());
    }, [dispatch]);

    // Don't show maintenance overlay on dashboard page
    const isDashboard = pathname?.startsWith("/dashboard");

    // If maintenance is active and not on dashboard, show only maintenance page
    if (isActive && !isDashboard) {
        return <MaintenanceOverlay message={message} />;
    }

    return <>{children}</>;
};

export default MaintenanceWrapper;
