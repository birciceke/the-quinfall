"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
    const router = useRouter();

    const { isActive, message } = useSelector(
        (state: RootState) => state.maintenance
    );

    useEffect(() => {
        dispatch(fetchMaintenanceStatus());
    }, [dispatch]);

    // Change document title and redirect when maintenance is active
    useEffect(() => {
        if (isActive && !pathname?.startsWith("/dashboard")) {
            document.title = "The Quinfall | Website Under Maintenance";
            if (pathname !== "/") {
                router.replace("/");
            }
        }
    }, [isActive, pathname, router]);

    // Don't show maintenance overlay on dashboard page
    const isDashboard = pathname?.startsWith("/dashboard");

    // If maintenance is active and not on dashboard, show only maintenance page
    if (isActive && !isDashboard) {
        return <MaintenanceOverlay message={message} />;
    }

    return <>{children}</>;
};

export default MaintenanceWrapper;
