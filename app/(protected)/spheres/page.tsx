"use client";

import { Input } from "@/components/ui/input";
import useGetSpheres from "./_hooks/useGetSpheres";
import { Card, CardTitle } from "@/components/ui/card";

export default function SpheresPage() {
    const { data } = useGetSpheres();

    return (
        <main className="h-screen w-screen">
            <Input />
            <div>
                {data &&
                    data.spheres &&
                    data.spheres.length != 0 &&
                    data.spheres.map((sphere) => (
                        <Card key={sphere.id} className="my-5 ">
                            <CardTitle>
                                <a href={"/spheres/" + sphere.id} className="hover:underline">
                                    {sphere.name}
                                </a>
                            </CardTitle>
                        </Card>
                    ))}
            </div>
        </main>
    );
}
