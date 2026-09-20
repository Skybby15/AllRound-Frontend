import { sphereApi } from "@/reactquery/apiClients";
import { useQuery } from "@tanstack/react-query";

export default function useGetNodeTree(sphereId: number) {
    return useQuery({
        queryKey: ["spheres", sphereId, "node-tree"],
        queryFn: async () => {
            return await sphereApi.sphereSphereIdNodeTreeGet({
                sphereId,
            });
        },
        enabled: !!sphereId,
    });
}
