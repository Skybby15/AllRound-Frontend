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
    onSubmit: (name: string) => void;
};

export function CreateEmptyDialog({ render, onSubmit }: CreateEmptyDialogProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("sphereName") as string;

        onSubmit(name);
    }

    return (
        <Dialog>
            <DialogTrigger render={render} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
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
