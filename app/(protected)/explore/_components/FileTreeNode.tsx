import { File, FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";
import { FileNode } from "../_types/FileNode";

export default function FileTreeNode({ node }: { node: FileNode }) {
    const [open, setOpen] = useState(false);

    if (node.type === "file") {
        return (
            <div className="flex cursor-pointer">
                <File className="mr-1" />
                {node.name}
            </div>
        );
    }

    return (
        <div>
            <button className="flex cursor-pointer" onClick={() => setOpen(!open)}>
                {open ? <FolderOpen className="mr-1" /> : <FolderClosed className="mr-1" />}{" "}
                {node.name}
            </button>

            {open && node.children && (
                <div className="relative ml-3 pl-4 border-l border-gray-400">
                    {node.children.map((child) => (
                        <FileTreeNode key={child.name} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}
