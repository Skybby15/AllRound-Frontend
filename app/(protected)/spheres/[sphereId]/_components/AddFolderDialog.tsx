import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FolderDropzone, { FolderMap } from "./FolderDropzone";
import { RefObject, useEffect, useState } from "react";
import useAddNodeTree from "../_hooks/useAddNodeTree";
import { AddNodeRequest} from "@/api";
import CreateAddNodeTreeFromFolders from "../_utils/CreateAddNodeTreeFromFolders";

type AddFolderDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    sphereId: number;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFolderDialog({
    show,
    setShow,
    sphereId,
    nodeIdRef,
}: AddFolderDialogProps) {
    const { mutate, isPending } = useAddNodeTree(sphereId);
    const [uploading, setUploading] = useState(false);

    const handleFoldersSelected = (folders: FolderMap) => {
        const parentNodeId = nodeIdRef.current;

        const { nodes, clientInfoList } = CreateAddNodeTreeFromFolders(folders);

        const request: AddNodeRequest = {
            sphereId,
            parentNodeId,
            nodes,
        };


        setUploading(true);
        mutate({ request, clientInfoList });
    };

    useEffect(()=>{
        console.log(isPending)
    
        if(isPending == false)
        {
            setShow(false);
            setUploading(false);
        }

    },[isPending])

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Folder Dialog</DialogTitle>
                    <DialogDescription>
                        Use this dropzone to add one or more folders to your sphere. Empty folders
                        will be added ONLY if dragged , not browsed.
                    </DialogDescription>
                </DialogHeader>
                { !uploading && show &&
                    <FolderDropzone onFoldersSelected={handleFoldersSelected} />
                }
                { uploading &&
                    <p>Uploading...</p>
                }
            </DialogContent>
        </Dialog>
    );
}
