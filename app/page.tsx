"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This should be a frontpage, for now it just redirects to auth page;
export default function Home() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push("/home");
        } else if (!isAuthenticated && !isLoading) {
            router.push("/auth");
        }
    }, [isAuthenticated, isLoading, router]);

    return <></>;
}
