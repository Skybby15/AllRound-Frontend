"use client";

import GlobeScene from "@/app/(public)/auth/_components/GlobeScene";
import { useState } from "react";
import Start from "./_components/Start";
import { HomeSection } from "./_types/HomeState";
import CreateSphere from "./_components/CreateSphere";

export default function AuthPage() {
    const [state, setState] = useState<HomeSection>("start");

    return (
        <main className="h-screen w-screen">
            <GlobeScene animating={true} withGlobe={false} />
            {state == "start" && <Start toPageFn={setState} />}
            {state == "create" && <CreateSphere />}
        </main>
    );
}
