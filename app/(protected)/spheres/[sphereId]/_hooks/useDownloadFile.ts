import { nodeApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useMutation } from "@tanstack/react-query";

export default function useDownloadFile() {
    return useMutation({
        mutationFn: async (fileId: number) => {
            return await apiRequest(()=>{
                return nodeApi.nodeIdDownloadUrlGet({
                    id: fileId,
                });
            })
        },
    });
}
