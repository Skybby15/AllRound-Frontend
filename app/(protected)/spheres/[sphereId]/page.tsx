"use client";

import { colors } from "@/app/colors";
import { Orbit, Plus, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import useGetNodeTree from "./_hooks/useGetNodeTree";
import FileTree from "./_components/FileTreeNode";
import ConstructTreeNode from "./_utils/ConstructNodeTree";
import { Button } from "@/components/ui/button";

export default function SpherePage() {
    const { sphereId } = useParams<{ sphereId: string }>();

    const { data, isLoading, isError, error } = useGetNodeTree(Number(sphereId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.log(error);
        return <div>Failed to load nodes.</div>;
    }

    const nodes = ConstructTreeNode(data?.nodes ?? []);
    console.log(nodes);

    return (
        <main className="h-screen w-screen content-center">
            <div className="bg-secondary/50 border-secondary border-10 w-3/4 min-w-100 h-3/4 min-h-100 rounded-lg overflow-hidden">
                <div className="flex justify-between px-5 py-3">
                    <h1 className="flex items-center gap-2 text-2xl font-bold">
                        <Orbit color={colors.primary2} />
                        Sphere Name
                    </h1>

                    <div className="flex gap-2">
                        <Button>
                            <Plus />
                        </Button>

                        <Button variant={"outline"} disabled>
                            <Settings />
                        </Button>
                    </div>
                </div>

                <div className="w-max max-w-3/4 h-max max-h-full ml-5 overflow-auto border-b border-b-gray-400 pb-1">
                    <FileTree nodes={nodes} />
                </div>
            </div>
        </main>
    );
}
