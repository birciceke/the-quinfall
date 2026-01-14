"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ToastContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Check if toast-root exists, if not create it
        let toastRoot = document.getElementById("toast-root");

        if (!toastRoot) {
            toastRoot = document.createElement("div");
            toastRoot.id = "toast-root";
            // Append to html element, not body - this ensures it's outside any transform contexts
            document.documentElement.appendChild(toastRoot);
        }

        // Apply styles directly
        toastRoot.style.position = "fixed";
        toastRoot.style.bottom = "32px";
        toastRoot.style.left = "0";
        toastRoot.style.right = "0";
        toastRoot.style.display = "flex";
        toastRoot.style.justifyContent = "center";
        toastRoot.style.alignItems = "center";
        toastRoot.style.pointerEvents = "none";
        toastRoot.style.zIndex = "2147483647"; // Max z-index

        setPortalElement(toastRoot);

        return () => {
            // Don't remove on unmount as other components might use it
        };
    }, []);

    if (!portalElement) return null;

    return createPortal(
        <div style={{ pointerEvents: "auto" }}>
            {children}
        </div>,
        portalElement
    );
};

export default ToastContainer;
