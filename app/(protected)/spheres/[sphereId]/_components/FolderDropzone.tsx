"use client";

import { useRef, useState } from "react";
import { FolderOpen, UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Folder } from "../_utils/CreateAddNodeTreeFromFolders";

export type FolderMap = Map<string, Folder | File>;

interface FolderDropzoneProps {
    onFoldersSelected: (folders: FolderMap) => void;
}

export default function FolderDropzone({ onFoldersSelected }: FolderDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const root: FolderMap = new Map();

        for (const file of Array.from(e.target.files)) {
            const parts = (file.webkitRelativePath || file.name).split("/");

            let current = root;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const isFile = i === parts.length - 1;

                if (isFile) {
                    current.set(part, file);
                    continue;
                }

                let folder = current.get(part);

                if (!folder || folder instanceof File) {
                    folder = {
                        children: new Map(),
                    };

                    current.set(part, folder);
                }

                current = folder.children;
            }
        }

        if (root.size > 0) {
            onFoldersSelected(root);
        }
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const items = Array.from(e.dataTransfer.items);

        const entries = items
            .filter((item) => item.kind === "file")
            .map((item) => item.webkitGetAsEntry())
            .filter(
                (entry): entry is FileSystemEntry =>
                    entry !== null
            );

        const root: FolderMap = new Map();

        for (const entry of entries) {
            if (entry.isDirectory) {
                const folder = await readDirectory(
                    entry as FileSystemDirectoryEntry
                );

                root.set(entry.name, folder);
            }
        }

        if (root.size > 0) {
            onFoldersSelected(root);
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
                flex min-h-48 cursor-pointer flex-col
                items-center justify-center gap-2
                rounded-lg border-2 border-dashed
                transition-colors
                ${
                    isDragging
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground/25 hover:border-primary/50"
                }
            `}
        >
            {isDragging ? (
                <FolderOpen className="h-10 w-10 text-primary" />
            ) : (
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
            )}

            <p className="text-sm font-medium">Drag folders here</p>

            <p className="text-xs text-muted-foreground">or click to browse a single folder</p>

            <Input
                ref={inputRef}
                type="file"
                multiple
                // @ts-expect-error webkitdirectory is not in React's InputHTMLAttributes
                webkitdirectory=""
                className="hidden"
                onChange={handleInputChange}
            />
        </div>
    );
}

function getFile(entry: FileSystemFileEntry): Promise<File> {
    return new Promise((resolve, reject) => {
        entry.file(resolve, reject);
    });
}

async function readDirectory(
    directory: FileSystemDirectoryEntry
): Promise<Folder> {
    const folder: Folder = {
        children: new Map(),
    };

    const reader = directory.createReader();
    const entries = await readAllEntries(reader);

    for (const entry of entries) {
        if (entry.isFile) {
            const file = await getFile(entry as FileSystemFileEntry);

            folder.children.set(entry.name, file);
        } else if (entry.isDirectory) {
            const childFolder = await readDirectory(
                entry as FileSystemDirectoryEntry
            );

            folder.children.set(entry.name, childFolder);
        }
    }

    return folder;
}

function readAllEntries(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return new Promise((resolve, reject) => {
        const entries: FileSystemEntry[] = [];

        const read = () => {
            reader.readEntries((batch) => {
                if (batch.length === 0) {
                    resolve(entries);
                    return;
                }

                entries.push(...batch);
                read();
            }, reject);
        };

        read();
    });
}
