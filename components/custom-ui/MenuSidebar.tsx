import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    EyeDashed,
    LockKeyhole,
    LogOut,
    LucideIcon,
    Orbit,
    SaveCheck,
    StarIcon,
    User,
} from "lucide-react";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
    label: string;
    icon: LucideIcon;
    className: string;
};

function MenuButton({ label, icon: Icon, className }: MenuButtonProps) {
    return (
        <Button className="group/menuButton cursor-pointer" variant="outline">
            <div
                className={cn(
                    " flex flex-row items-center overflow-hidden",
                    "w-full max-w-full",
                    "transition-[max-width] duration-300",
                    className
                )}
            >
                <p className="flex-1 text-start whitespace-nowrap">{label}</p>
                <Icon />
            </div>
        </Button>
    );
}

export function MenuSidebar() {
    const { logoutAct } = useAuth();

    const [openSpheres, setIsOpenSpheres] = useState(true);
    const [openAccount, setIsOpenAccount] = useState(true);

    const router = useRouter();

    const onLogout = () => {
        logoutAct();
        router.push("/auth");
    };

    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row items-center">
                <Button className="py-5 w-full" variant={"ghost"}>
                    <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Label>UsrName</Label>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <Separator />
                <SidebarGroup>
                    <Collapsible
                        open={openSpheres}
                        onOpenChange={setIsOpenSpheres}
                        className="flex w-full flex-col gap-2"
                    >
                        <div className="flex items-center justify-between gap-4 px-4">
                            <h4 className="text-sm font-semibold text-primary">Spheres</h4>
                            <CollapsibleTrigger
                                render={
                                    <Button variant="ghost" size="icon" className="size-8">
                                        {openSpheres && (
                                            <>
                                                <ChevronUp className="text-primary" />
                                                <span className="sr-only">Toggle details</span>
                                            </>
                                        )}
                                        {!openSpheres && (
                                            <>
                                                <ChevronDown className="text-primary" />
                                                <span className="sr-only">Toggle details</span>
                                            </>
                                        )}
                                    </Button>
                                }
                            />
                        </div>
                        <CollapsibleContent className="flex flex-col gap-2">
                            <MenuButton
                                label="My Spheres"
                                className="group-hover/menuButton:max-w-26"
                                icon={Orbit}
                            />
                            <MenuButton
                                label="Favorites"
                                className="group-hover/menuButton:max-w-21"
                                icon={StarIcon}
                            />
                            <MenuButton
                                label="Saved"
                                className="group-hover/menuButton:max-w-16"
                                icon={SaveCheck}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>
                <SidebarGroup>
                    <Collapsible
                        open={openAccount}
                        onOpenChange={setIsOpenAccount}
                        className="flex w-full flex-col gap-2"
                    >
                        <div className="flex items-center justify-between gap-4 px-4">
                            <h4 className="text-sm font-semibold text-[#0355fc]">Account</h4>
                            <CollapsibleTrigger
                                render={
                                    <Button variant="ghost" size="icon" className="size-8">
                                        {openAccount && (
                                            <>
                                                <ChevronUp className="text-[#0355fc]" />
                                                <span className="sr-only">Toggle details</span>
                                            </>
                                        )}
                                        {!openAccount && (
                                            <>
                                                <ChevronDown className="text-[#0355fc]" />
                                                <span className="sr-only">Toggle details</span>
                                            </>
                                        )}
                                    </Button>
                                }
                            />
                        </div>
                        <CollapsibleContent className="flex flex-col gap-2">
                            <MenuButton
                                label="Profile"
                                className="group-hover/menuButton:max-w-16"
                                icon={User}
                            />
                            <MenuButton
                                label="Security"
                                className="group-hover/menuButton:max-w-20"
                                icon={LockKeyhole}
                            />
                            <MenuButton
                                label="Privacy"
                                className="group-hover/menuButton:max-w-18"
                                icon={EyeDashed}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    className="group/logout w-16 hover:w-full transition-[width] duration-300 overflow-hidden"
                    onClick={onLogout}
                >
                    <LogOut className="ml-3" />

                    <Label
                        className="
                            h-max
                            w-auto
                            opacity-0
                            overflow-hidden
                            transition-all duration-300
                            group-hover/logout:opacity-100
                        "
                    >
                        Log Out
                    </Label>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
