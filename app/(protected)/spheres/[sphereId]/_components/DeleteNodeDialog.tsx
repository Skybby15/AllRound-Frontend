import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RefObject, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useDeleteNode from "../_hooks/useDeleteNode";

type DeleteNodeDialogProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    sphereId: number;
    nodeIdRef: RefObject<number | undefined>;
    isFolderRef: RefObject<boolean | undefined>;
    onDeleteSuccess: (deletedNodeId: number) => void;
};

export default function DeleteNodeDialog({ show, setShow, sphereId, nodeIdRef, isFolderRef, onDeleteSuccess }: DeleteNodeDialogProps) {
    const {mutate, status} = useDeleteNode(sphereId);

    const handleDelete = () => {
        const nodeId = nodeIdRef.current;
        if (nodeId !== undefined) {
            mutate({ nodeId });
            setShow(false);
        }
    }

    useEffect(() => {
        if (status === "success") {
            onDeleteSuccess(nodeIdRef.current!);
        }
    },[status]);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                        {isFolderRef.current === true && (
                            <>
                                <br />
                                This will also delete all child files and folders.
                            </>
                        )}
                    </DialogDescription>
                </DialogHeader>
                 <DialogFooter>
                    <Button variant={"destructive"} onClick={handleDelete}>
                        Delete {isFolderRef.current === true ? "folder" : "file"}
                    </Button>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
