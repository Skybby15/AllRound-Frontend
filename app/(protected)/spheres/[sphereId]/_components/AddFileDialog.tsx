import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FileDropzone from "./FileDropzone";
import { RefObject } from "react";

type AddFileDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFileDialog({ show, setShow, nodeIdRef }: AddFileDialogProps) {
    const nodeId = nodeIdRef.current;

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add File Dialog</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <FileDropzone
                    onFilesSelected={(files) => {
                        console.log("attaching files under node: " + nodeId)
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
