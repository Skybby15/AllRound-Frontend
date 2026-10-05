"use client";

import { FilePlusIcon, FolderPlusIcon, Orbit, Plus, Settings } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { useEffect, useRef, useState } from "react";
import AddFileDialog from "./_components/AddFileDialog";
import AddFolderDialog from "./_components/AddFolderDialog";
import { TreeNode } from "./_types/TreeNode";
import SelectedFileInfo from "./_components/SelectedFileInfo";
import DeleteNodeDialog from "./_components/DeleteNodeDialog";

interface SpherePageProps {
    searchParams: Promise<{
        name?: string;
    }>;
}

export default function SpherePage({searchParams}: SpherePageProps) {
    const { sphereId } = useParams<{ sphereId: string }>();
    const sphereName = useSearchParams().get("name");

    const router = useRouter();

    useEffect(() => {
        if (!sphereName) {
            router.push("/spheres");
        }
    }, [sphereName, router]);

    if (!sphereName) {
        return null;
    }

    const { data, isLoading, isError, error } = useGetNodeTree(Number(sphereId));

    const [showAddFileDialog, setShowAddFileDialog] = useState(false);
    const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
    const nodeIdRef = useRef<number | undefined>(undefined);

    const [selectedFileNode, setSelectedFileNode] = useState<TreeNode | null>(null);

    const [showDeleteNodeDialog, setShowDeleteNodeDialog] = useState(false);
    const isFolderRef = useRef<boolean | undefined>(undefined);

    const showAddFileDialogForNode = (nodeId: number | undefined = undefined) => {
        nodeIdRef.current = nodeId;
        setShowAddFileDialog(true);
    };

    const showAddFolderDialogForNode = (nodeId: number | undefined = undefined) => {
        nodeIdRef.current = nodeId;
        setShowAddFolderDialog(true);
    };

    const showDeleteNodeDialogForNode = (nodeId: number, isFolder: boolean) => {
        nodeIdRef.current = nodeId;
        isFolderRef.current = isFolder;
        setShowDeleteNodeDialog(true);
    };

    const onSelectedFilePopupClose = () => {
        setSelectedFileNode(null);
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
        <main className="flex h-screen w-screen items-center">
            <div className="bg-secondary/50 border-secondary border-10 w-3/4 min-w-100 h-3/4 min-h-100 rounded-lg overflow-hidden">
                <div className="flex justify-between px-5 py-3">
                    <h1 className="flex items-center gap-2 text-2xl font-bold">
                        <Orbit className="text-primary2" />
                        {sphereName}
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
                                            showAddFolderDialogForNode();
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

                <div className="w-full min-w-100 max-h-9/10 overflow-auto border-b border-b-gray-400 pb-1">
                    <div className="relative ml-2 pl-4">
                        <SphereNodeTree
                            nodes={sphereNodes}
                            dialogsProps={{
                                showAddFileDialogForNode,
                                showAddFolderDialogForNode,
                                showDeleteNodeDialogForNode,
                                setSelectedFileNode,
                            }}
                        />
                    </div>
                </div>
            </div>
            {selectedFileNode && (
                <SelectedFileInfo
                    node={selectedFileNode}
                    onClose={onSelectedFilePopupClose}
                    onDelete={() =>
                        showDeleteNodeDialogForNode(
                            selectedFileNode.id!,
                            selectedFileNode.type === "FILE" ? false : true
                        )
                    }
                />
            )}
            <AddFileDialog
                show={showAddFileDialog}
                setShow={setShowAddFileDialog}
                sphereId={Number(sphereId)}
                nodeIdRef={nodeIdRef}
            />
            <AddFolderDialog
                show={showAddFolderDialog}
                setShow={setShowAddFolderDialog}
                sphereId={Number(sphereId)}
                nodeIdRef={nodeIdRef}
            />
            <DeleteNodeDialog
                show={showDeleteNodeDialog}
                setShow={setShowDeleteNodeDialog}
                sphereId={Number(sphereId)}
                nodeIdRef={nodeIdRef}
                isFolderRef={isFolderRef}

                onDeleteSuccess={(deletedNodeId) => {
                    if (selectedFileNode && selectedFileNode.id === deletedNodeId) {
                        setSelectedFileNode(null);
                    }
                }}
            />
        </main>
    );
}
