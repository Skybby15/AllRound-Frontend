import { sphereApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

export default function useGetNodeTree(sphereId: number) {
    return useQuery({
        queryKey: ["spheres", sphereId, "node-tree"],
        queryFn: async () => {
            return await apiRequest(()=>{
                return sphereApi.sphereSphereIdNodeTreeGet({
                    sphereId,
                });
            })
        },
        enabled: !!sphereId,
    });
}
