import {
    File,
    FilePlusIcon,
    FolderClosed,
    FolderOpen,
    FolderPlusIcon,
    MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { TreeNode } from "../_types/TreeNode";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DialogShowProps = {
    showAddFileDialogForNode: (nodeId: number | undefined) => void;
    showAddFolderDialogForNode: (nodeId: number | undefined) => void;
};

export default function SphereNodeTree({
    nodes,
    dialogsProps,
}: {
    nodes: TreeNode[];
    dialogsProps: DialogShowProps;
}) {
    return (
        <div>
            {nodes.map((node) => (
                <NodeTree key={node.id} node={node} dialogProps={dialogsProps} />
            ))}
        </div>
    );
}

function NodeTree({ node, dialogProps }: { node: TreeNode; dialogProps: DialogShowProps }) {
    const [open, setOpen] = useState(false);
    const { showAddFileDialogForNode, showAddFolderDialogForNode } = dialogProps;

    if (!node.id) return;

    if (node.type === "FILE") {
        return (
            <div className="flex w-max cursor-pointer group hover:bg-amber-700 items-center px-2 py-1 rounded-sm">
                <File className="mr-1" />
                {node.name}
            </div>
        );
    }

    return (
        <div>
            <div className="flex w-max items-center group">
                <button
                    className="flex cursor-pointer items-center px-2 py-1 rounded-sm hover:bg-amber-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FolderOpen className="mr-1" /> : <FolderClosed className="mr-1" />}

                    {node.name}
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                className="ml-2 scale-0 transition-transform duration-200 group-hover:scale-100"
                                variant="secondary"
                                size="icon-sm"
                            >
                                <MoreHorizontal className="scale-130" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent className="w-40 p-2">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Folder options</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => showAddFileDialogForNode(node.id)}>
                                <FilePlusIcon />
                                Add File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => showAddFolderDialogForNode(node.id)}>
                                <FolderPlusIcon />
                                Add Folder
                            </DropdownMenuItem>
                            <DropdownMenuItem>Details</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {open && node.children.length > 0 && (
                <div className="relative ml-3 pl-4 border-l border-gray-400">
                    <SphereNodeTree nodes={node.children} dialogsProps={dialogProps} />
                </div>
            )}
        </div>
    );
}
