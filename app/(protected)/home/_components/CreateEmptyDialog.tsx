import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactElement } from "react";

type CreateEmptyDialogProps = {
    render?: ReactElement | undefined;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function CreateEmptyDialog({ render, onSubmit }: CreateEmptyDialogProps) {
    return (
        <Dialog>
            <DialogTrigger render={render} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new Sphere</DialogTitle>
                        <DialogDescription>Name your new Sphere</DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="sphereName">Name</Label>
                            <Input id="sphereName" name="sphereName" placeholder="New Sphere" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
