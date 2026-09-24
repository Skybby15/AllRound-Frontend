import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FolderDropzone from "./FolderDropzone";
import { RefObject } from "react";

type AddFolderDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFolderDialog({ show, setShow, nodeIdRef }: AddFolderDialogProps) {
    const nodeId = nodeIdRef.current;

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Folder Dialog</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <FolderDropzone
                    onFilesSelected={(files) => {
                        console.log("attaching folders under node: " + nodeId)
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
