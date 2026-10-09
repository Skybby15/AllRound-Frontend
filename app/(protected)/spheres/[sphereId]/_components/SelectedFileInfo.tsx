import { Button } from "@/components/ui/button";
import { TreeNode } from "../_types/TreeNode";
import { DownloadIcon, FileIcon, Trash2Icon, XIcon } from "lucide-react";
import useDownloadFile from "../_hooks/useDownloadFile";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="relative flex flex-col items-center bg-secondary/50 border-secondary border-10 w-4/11 h-2/3 mx-5 min-h-100 rounded-lg overflow-hidden">
            <div className="absolute flex justify-end top-0 w-full ">
                <Button className="m-2" variant={"destructive"} onClick={onClose}>
                    <XIcon />
                </Button>
            </div>
            <div className="flex w-5/6 min-w-0 items-center mt-15 justify-center">
                <FileIcon className=" size-10 mr-2 shrink-0" />
                <Tooltip>
                    <TooltipTrigger render={
                        <p className="flex-1 min-w-0 max-w-full text-xl truncate">
                            {node.name}
                        </p>
                    }/>
                    <TooltipContent>
                        <p>{node.name}</p>
                    </TooltipContent>
                </Tooltip>
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
