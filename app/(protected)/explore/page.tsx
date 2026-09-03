"use client";

import { colors } from "@/app/colors";
import { Orbit } from "lucide-react";
import { FileNode } from "./_types/FileNode";
import FileTreeNode from "./_components/FileTreeNode";

const files: FileNode = {
    name: "root",
    type: "folder",
    children: [
        {
            name: "src",
            type: "folder",
            children: [
                {
                    name: "components",
                    type: "folder",
                    children: [
                        { name: "Button.tsx", type: "file" },
                        { name: "Dialog.tsx", type: "file" },
                    ],
                },
                { name: "App.tsx", type: "file" },
            ],
        },
        {
            name: "package.json",
            type: "file",
        },
    ],
};

export default function AuthPage() {
    return (
        <main className="h-screen w-screen content-center">
            <div className="bg-secondary w-3/4 min-w-100 h-3/4 min-h-100 rounded-lg overflow-hidden">
                <h1 className="flex items-center gap-2 text-2xl font-bold px-5 py-3 ">
                    <Orbit color={colors.primary2} />
                    Sphere Name
                </h1>
                <div className="w-max max-w-3/4 h-max max-h-full ml-5 overflow-auto border-b border-b-gray-400 pb-1">
                    <FileTreeNode key={files.name} node={files} />
                </div>
            </div>
        </main>
    );
}
