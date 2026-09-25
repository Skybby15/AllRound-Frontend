import { AddNodeRequest, ResponseError } from "@/api";
import { nodeApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddNodeTree(sphereId : number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: AddNodeRequest) => {
            try{
                return await nodeApi.nodePost({
                    addNodeRequest: request
                })
            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },

        onSuccess: (response) => {
            console.log("Response got: \n" + response.nodes?.forEach((node) => node.name))
            //TODO upload files to firebase storage

            queryClient.invalidateQueries({
                queryKey: ["spheres", sphereId, "node-tree"]
            })
        }
    });
}
