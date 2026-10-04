import { Button } from "@/components/ui/button";
import { TreeNode } from "../_types/TreeNode";
import { DownloadIcon, FileIcon, Trash2Icon, XIcon } from "lucide-react";
import useDownloadFile from "../_hooks/useDownloadFile";
import { toast } from "sonner";

type SelectedFileInfoProps = {
    node: TreeNode;
    onClose: () => void;
    onDelete: () => void;
};

export default function SelectedFileInfo({ node, onClose, onDelete }: SelectedFileInfoProps) {
    const { mutate } = useDownloadFile();

    const handleDownload = () => {
        if (node.id)
            mutate(node.id, {
                onSuccess: async (response) => {
                    const downloadUrl = response.downloadUrl;

                    if (!downloadUrl) return;

                    const fileResponse = await fetch(downloadUrl);

                    if (!fileResponse.ok) {
                        toast.error(`Download failed: ${fileResponse.status}`);
                        return;
                    }

                    const blob = await fileResponse.blob();

                    const blobUrl = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = node.name!;

                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    URL.revokeObjectURL(blobUrl);
                },
            });
    };

    return (
        <div className="relative bg-secondary/50 border-secondary border-10 w-1/4 min-w-100 h-2/3 mx-5 min-h-100 rounded-lg overflow-hidden">
            <div className="absolute flex justify-end top-0 w-full ">
                <Button className="m-2" variant={"destructive"} onClick={onClose}>
                    <XIcon />
                </Button>
            </div>
            <div className="flex items-center ml-5 mt-15">
                <FileIcon className="size-10 mr-2" />
                <p className="text-xl">{node.name}</p>
            </div>
            <div className="flex justify-center">
                <p>Details of the file will be here</p>
            </div>
            <div className="flex justify-center">
                <Button onClick={handleDownload}>
                    <DownloadIcon />
                    Download
                </Button>
                <Button onClick={onDelete} variant={"destructive"} className="ml-2">
                    <Trash2Icon />
                    Delete
                </Button>
            </div>
        </div>
    );
}
