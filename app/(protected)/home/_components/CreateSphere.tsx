import { Folder, Globe, Orbit } from "lucide-react";
import { CreateEmptyDialog } from "./CreateEmptyDialog";
import CreateSphereButton from "./CreateSphereButton";
import { CreateFromFolderDialog } from "./CreateFromFolderDialog";
import { useRouter } from "next/navigation";

export default function CreateSphere() {
    const router = useRouter();

    const handleCreateEmptySphere = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Creating empty sphere...");
        router.push("/explore");
    };

    return (
        <div className="flex flex-col h-full items-center">
            <h1 className="mt-20 text-4xl">Create your next Sphere</h1>
            <div className="flex items-center justify-between px-30 w-full h-full">
                <CreateEmptyDialog
                    render={
                        <CreateSphereButton className="z-10">
                            <Orbit className="absolute inset-0 m-auto size-32 opacity-20" />
                            Empty Sphere
                        </CreateSphereButton>
                    }
                    onSubmit={handleCreateEmptySphere}
                />
                <CreateFromFolderDialog
                    render={
                        <CreateSphereButton className="hover:bg-[#0355fc] z-0">
                            <Folder className="absolute inset-0 m-auto size-32 opacity-20" />
                            From Folder
                        </CreateSphereButton>
                    }
                />
                <CreateSphereButton>
                    <Globe className="absolute inset-0 m-auto size-32 opacity-20" />
                    Copy Sphere
                </CreateSphereButton>
            </div>
        </div>
    );
}
