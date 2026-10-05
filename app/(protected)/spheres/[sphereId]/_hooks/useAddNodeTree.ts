import { AddNodeRequest } from "@/api";
import useApiRequest from "@/hooks/useApiRequest";
import { nodeApi } from "@/reactquery/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

type RequestProp = {
    request: AddNodeRequest;
    clientInfoList: Map<string, File>;
};

export default function useAddNodeTree(sphereId: number) {
    const queryClient = useQueryClient();
    const apiRequest = useApiRequest();
    const clientInfoRef = useRef<Map<string, File> | null>(null);

    return useMutation({
        mutationFn: async ({ request, clientInfoList }: RequestProp) => {
            clientInfoRef.current = clientInfoList;

            return await apiRequest(() => {
                return nodeApi.nodePost({
                    addNodeRequest: request,
                });
            });
        },

        onSuccess: (response) => {
            const nodes = response.nodes;
            const clientInfo = clientInfoRef.current;

            if (!clientInfo) return;

            if (!nodes) return;

            nodes.forEach((node) => {
                const uploadUrl = node.uploadURL;
                const file = clientInfo.get(node.clientId!);

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
            });

            queryClient.invalidateQueries({
                queryKey: ["spheres", sphereId, "node-tree"],
            });
        },
    });
}
