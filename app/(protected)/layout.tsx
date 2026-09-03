"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MenuSidebar } from "@/components/custom-ui/MenuSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <MenuSidebar />
                <SidebarTrigger className={"z-100"} />
                {children}
            </SidebarProvider>
        </ProtectedRoute>
    );
}
