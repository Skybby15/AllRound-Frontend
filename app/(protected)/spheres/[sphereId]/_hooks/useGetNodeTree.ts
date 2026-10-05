import useApiRequest from "@/hooks/useApiRequest";
import { sphereApi } from "@/reactquery/apiClients";
import { useQuery } from "@tanstack/react-query";

export default function useGetNodeTree(sphereId: number) {
    const apiRequest = useApiRequest();

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
