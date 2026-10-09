import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FileDropzone from "./FileDropzone";
import { RefObject, useEffect } from "react";
import useAddNodeTree from "../_hooks/useAddNodeTree";
import { AddNodeRequest } from "@/api";
import CreateAddNodeTreeFromFiles from "../_utils/CreateAddNodeTreeFromFiles";

type AddFileDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    sphereId: number;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFileDialog({ show, setShow, sphereId, nodeIdRef }: AddFileDialogProps) {
    const { mutate, status, reset: resetMutationState } = useAddNodeTree(sphereId);

    const handleFilesSelected = (files: File[]) => {
        const parentNodeId = nodeIdRef.current;

        const { nodes, clientInfoList } = CreateAddNodeTreeFromFiles(files);

        const request: AddNodeRequest = {
            sphereId,
            parentNodeId,
            nodes,
        };

        mutate({ request, clientInfoList });
    };

    useEffect(()=>{
    
        if(status == "success")
        {
            setShow(false);
            resetMutationState();
        }

    },[status])

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add File Dialog</DialogTitle>
                    <DialogDescription>
                        Use this dropzone to add one or more file to your sphere
                    </DialogDescription>
                </DialogHeader>
                { status == "idle" &&
                    <FileDropzone onFilesSelected={handleFilesSelected} />
                }
                { status != "idle" &&
                    <p>
                        Uploading...
                    </p>
                }
            </DialogContent>
        </Dialog>
    );
}
