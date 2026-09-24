"use client";

import { useRef, useState } from "react";

import { UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";

interface FileDropzoneProps {
    onFilesSelected: (files: File[]) => void;
}

export default function FileDropzone({ onFilesSelected }: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        onFilesSelected(Array.from(files));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files: File[] = [];

        for (const item of Array.from(e.dataTransfer.items)) {
            if (item.kind !== "file") continue;

            const entry = item.webkitGetAsEntry();

            // Ignore folders
            if (!entry || entry.isDirectory) continue;

            const file = item.getAsFile();

            if (file) {
                files.push(file);
            }
        }

        if (files.length > 0) {
            onFilesSelected(files);
        }
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
                flex cursor-pointer flex-col items-center justify-center
                rounded-lg border-2 border-dashed p-8
                transition-colors
                ${
                    isDragging
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground/25 hover:border-primary/50"
                }
            `}
        >
            <UploadCloud className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="text-sm font-medium">Drag & drop files here</p>

            <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>

            <Input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    );
}
