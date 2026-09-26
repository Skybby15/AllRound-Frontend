import { AddNodeRequest, ResponseError } from "@/api";
import { nodeApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

type RequestProp = {
    request: AddNodeRequest,
    clientInfoList: Map<string, File>
}

export default function useAddNodeTree(sphereId : number) {
    const queryClient = useQueryClient();
    const clientInfoRef = useRef<Map<string, File> | null>(null);

    return useMutation({
        mutationFn: async ({request, clientInfoList}: RequestProp) => {
            clientInfoRef.current = clientInfoList;
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
            const nodes = response.nodes;
            const clientInfo = clientInfoRef.current;

            if(!clientInfo)
                return

            if(!nodes)
                return

            nodes.forEach((node) => {
                const uploadUrl = node.uploadURL;
                const file = clientInfo.get(node.clientId!);

                console.log("file: " + file?.name + "\nurl: " + uploadUrl)

                fetch(uploadUrl!, {
                    method: "PUT",
                    headers: {
                        "Content-Type": file!.type,
                    },
                    body: file,
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Upload failed: ${response.status}`);
                    }
                });

            })

            queryClient.invalidateQueries({
                queryKey: ["spheres", sphereId, "node-tree"]
            })
        }
    });
}

