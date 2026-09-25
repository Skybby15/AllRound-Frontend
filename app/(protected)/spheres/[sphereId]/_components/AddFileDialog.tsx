import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FileDropzone from "./FileDropzone";
import { RefObject } from "react";
import useAddNodeTree from "../_hooks/useAddNodeTree";
import { AddNodeRequest, NodeAddDTO } from "@/api";
import CreateAddNodeTreeFromFiles from "../_utils/CreateAddNodeTreeFromFiles";

type AddFileDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    sphereId: number;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFileDialog({ show, setShow, sphereId, nodeIdRef }: AddFileDialogProps) {
    const { mutate, status } = useAddNodeTree(sphereId);

    const handleFilesSelected = (files: File[]) => 
    {
        const parentNodeId = nodeIdRef.current;

        console.log("attaching files under node: " + parentNodeId);

        const nodes :  Array<NodeAddDTO> = CreateAddNodeTreeFromFiles(files);

        const request : AddNodeRequest = {
            sphereId,
            parentNodeId,
            nodes
        }  

        mutate(request)
    }

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add File Dialog</DialogTitle>
                    <DialogDescription>
                        Use this dropzone to add one or more file to your sphere
                    </DialogDescription>
                </DialogHeader>
                <FileDropzone
                    onFilesSelected={handleFilesSelected}
                />
            </DialogContent>
        </Dialog>
    );
}
