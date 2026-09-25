import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FolderDropzone, { FolderMap } from "./FolderDropzone";
import { RefObject } from "react";
import useAddNodeTree from "../_hooks/useAddNodeTree";
import { AddNodeRequest, NodeAddDTO } from "@/api";
import CreateAddNodeTreeFromFolders from "../_utils/CreateAddNodeTreeFromFolders";

type AddFolderDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    sphereId: number;
    nodeIdRef: RefObject<number | undefined>;
};

export default function AddFolderDialog({ show, setShow, sphereId, nodeIdRef }: AddFolderDialogProps) {
    const { mutate, status } = useAddNodeTree(sphereId);

    const handleFoldersSelected = (folders: FolderMap) => 
    {
        const parentNodeId = nodeIdRef.current;

        const nodes :  Array<NodeAddDTO> = CreateAddNodeTreeFromFolders(folders);

        nodes.forEach(console.log)

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
                    <DialogTitle>Add Folder Dialog</DialogTitle>
                    <DialogDescription>
                        Use this dropzone to add one or more folders to your sphere
                    </DialogDescription>
                </DialogHeader>
                <FolderDropzone
                    onFoldersSelected={handleFoldersSelected}
                />
            </DialogContent>
        </Dialog>
    );
}
