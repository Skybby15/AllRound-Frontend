import { sphereApi } from "@/reactquery/apiClients";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpheres() {
    return useQuery({
        queryKey: ["spheres"],
        queryFn: async () => {
            return await sphereApi.sphereGet();
        },
    });
}
