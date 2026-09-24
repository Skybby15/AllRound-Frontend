"use client";

import { colors } from "@/app/colors";
import { FilePlusIcon, FolderPlusIcon, Orbit, Plus, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import useGetNodeTree from "./_hooks/useGetNodeTree";
import SphereNodeTree from "./_components/SphereNodeTree";
import ConstructNodeTree from "./_utils/ConstructNodeTree";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import AddFileDialog from "./_components/AddFileDialog";
import AddFolderDialog from "./_components/AddFolderDialog";

export default function SpherePage() {
    const { sphereId } = useParams<{ sphereId: string }>();

    const { data, isLoading, isError, error } = useGetNodeTree(Number(sphereId));

    const [showAddFileDialog, setShowAddFileDialog] = useState(false);
    const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
    const nodeIdRef = useRef<number | undefined>(undefined);

    const showAddFileDialogForNode = (nodeId: number | undefined = undefined) => {
        nodeIdRef.current = nodeId;
        setShowAddFileDialog(true);
    };

    const showAddFolderDialogForNode = (nodeId: number | undefined = undefined) => {
        nodeIdRef.current = nodeId;
        setShowAddFolderDialog(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.log(error);
        return <div>Failed to load nodes.</div>;
    }

    const sphereNodes = ConstructNodeTree(data?.nodes ?? []);
    console.log(sphereNodes);

    return (
        <main className="h-screen w-screen content-center">
            <div className="bg-secondary/50 border-secondary border-10 w-3/4 min-w-100 h-3/4 min-h-100 rounded-lg overflow-hidden">
                <div className="flex justify-between px-5 py-3">
                    <h1 className="flex items-center gap-2 text-2xl font-bold">
                        <Orbit color={colors.primary2} />
                        Sphere Name
                    </h1>

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button>
                                        <Plus />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Folder options</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            showAddFileDialogForNode();
                                        }}
                                    >
                                        <FilePlusIcon />
                                        Add File
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            showAddFileDialogForNode();
                                        }}
                                    >
                                        <FolderPlusIcon />
                                        Add Folder
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant={"outline"} disabled>
                            <Settings />
                        </Button>
                    </div>
                </div>

                <div className="w-max max-w-3/4 h-max max-h-full ml-5 overflow-auto border-b border-b-gray-400 pb-1">
                    <SphereNodeTree
                        nodes={sphereNodes}
                        dialogsProps={{
                            showAddFileDialogForNode,
                            showAddFolderDialogForNode,
                        }}
                    />
                </div>
            </div>
            <AddFileDialog
                show={showAddFileDialog}
                setShow={setShowAddFileDialog}
                nodeIdRef={nodeIdRef}
            />
            <AddFolderDialog
                show={showAddFolderDialog}
                setShow={setShowAddFolderDialog}
                nodeIdRef={nodeIdRef}
            />
        </main>
    );
}
