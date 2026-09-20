import { File, FilePlusIcon, FolderClosed, FolderOpen, FolderPlusIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { TreeNode } from "../_types/TreeNode";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function FileTree({ nodes }: { nodes: TreeNode[] }) {
    return (
        <div>
            {nodes.map((node) => (
                <FileTreeNode key={node.id} node={node} />
            ))}
        </div>
    );
}

function FileTreeNode({ node }: { node: TreeNode }) {
    const [open, setOpen] = useState(false);

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
                    <DropdownMenuTrigger render={
                        <Button
                            className="ml-2 scale-0 transition-transform duration-200 group-hover:scale-100"
                            variant="secondary"
                            size="icon-sm"
                            onClick={() => {
                                // open context menu / options
                            }}
                        >
                            <MoreHorizontal className="scale-130" />
                        </Button>
                    } />
                        <DropdownMenuContent className="w-40 p-2">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Folder options</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <FolderPlusIcon/>
                                    Add Folder
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FilePlusIcon/>
                                    Add File
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Details
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {open && node.children.length > 0 && (
                <div className="relative ml-3 pl-4 border-l border-gray-400">
                    <FileTree nodes={node.children} />
                </div>
            )}
        </div>
    );
}
