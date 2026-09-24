"use client";

import { useRef, useState } from "react";
import { FolderOpen, UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";

export interface DroppedFile {
    file: File;
    path: string;
}

interface FolderDropzoneProps {
    onFilesSelected: (files: DroppedFile[]) => void;
}

export default function FolderDropzone({ onFilesSelected }: FolderDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files: DroppedFile[] = Array.from(e.target.files).map((file) => ({
            file,
            path: file.webkitRelativePath || file.name,
        }));

        onFilesSelected(files);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const items = Array.from(e.dataTransfer.items);

        const entries = items
            .filter((item) => item.kind === "file")
            .map((item) => item.webkitGetAsEntry())
            .filter((entry): entry is FileSystemEntry => entry !== null);

        const files: DroppedFile[] = [];

        for (const entry of entries) {
            //ignore direct files dragged
            if (entry.isDirectory) {
                const directoryFiles = await readDirectory(entry as FileSystemDirectoryEntry);

                files.push(...directoryFiles);
            }
        }

        if (files.length > 0) {
            onFilesSelected(files);
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
    directory: FileSystemDirectoryEntry,
    parentPath = directory.name
): Promise<DroppedFile[]> {
    const reader = directory.createReader();

    const entries = await readAllEntries(reader);

    const files: DroppedFile[] = [];

    for (const entry of entries) {
        const path = `${parentPath}/${entry.name}`;

        if (entry.isFile) {
            const file = await getFile(entry as FileSystemFileEntry);

            files.push({
                file,
                path,
            });
        } else if (entry.isDirectory) {
            files.push(...(await readDirectory(entry as FileSystemDirectoryEntry, path)));
        }
    }

    return files;
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
