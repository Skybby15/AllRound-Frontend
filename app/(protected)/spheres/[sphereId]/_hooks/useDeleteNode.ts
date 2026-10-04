import { ResponseError } from "@/api";
import { nodeApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useDeleteNode(sphereId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ nodeId }: { nodeId: number }) => {
            try{
                return await nodeApi.nodeIdDelete({
                    id: nodeId,
                });

            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["spheres", sphereId, "node-tree"],
            });
        }
    })

}