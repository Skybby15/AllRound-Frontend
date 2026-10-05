import useApiRequest from "@/hooks/useApiRequest";
import { nodeApi } from "@/reactquery/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteNode(sphereId: number) {
    const queryClient = useQueryClient();
    const apiRequest = useApiRequest();

    return useMutation({
        mutationFn: async ({ nodeId }: { nodeId: number }) => {
            return await apiRequest(() => {
                return nodeApi.nodeIdDelete({
                    id: nodeId,
                });
            })
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["spheres", sphereId, "node-tree"],
            });
        },
    });
}
