"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { cn } from "@/lib/utils";
import GlobeScene from "./GlobeScene";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function AuthLayout() {
    const [isSignup, setIsSignup] = useState(false);
    const [animate, setAnimate] = useState(true);

    return (
        <main className="bg-transparent">
            <div className="grid lg:grid-cols-2">
                {/* Background */}
                <GlobeScene animating={animate} />

                {/* Content */}
                <section className="relative h-screen w-screen overflow-hidden flex justify-center items-center z-10">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <div className="flex absolute top-5 left-5 z-10">
                                    <Switch
                                        className={"m-1"}
                                        onCheckedChange={setAnimate}
                                        defaultChecked
                                    />
                                </div>
                            }
                        />
                        <TooltipContent>
                            <p>Start/Stop animating</p>
                        </TooltipContent>
                    </Tooltip>
                    <div
                        className={cn(
                            "flex flex-col h-full w-full transition-transform duration-500 ease-out",
                            isSignup ? "-translate-y-full" : "translate-y-0",
                            "will-change-transforms"
                        )}
                    >
                        <div
                            className="h-full w-full shrink-0 overflow-y-auto scrollbar-thumb-amber-50"
                            inert={isSignup} //if i ever forget , inert is so tabbing through the forms doesnt bring the hidden (or not shown) form into the view
                        >
                            <div className="flex min-h-full items-center justify-center py-8">
                                <LoginForm switchupFn={() => setIsSignup(true)} />
                            </div>
                        </div>

                        <div
                            className="h-full w-full shrink-0 overflow-y-auto scrollbar-thumb-amber-50"
                            inert={!isSignup}
                        >
                            <div className="flex min-h-full items-center justify-center py-8">
                                <SignupForm switchupFn={() => setIsSignup(false)} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
