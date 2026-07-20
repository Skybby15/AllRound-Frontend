"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This should be a frontpage, for now it just redirects to auth page;
export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth");
    }, []);

    return <></>;
}
