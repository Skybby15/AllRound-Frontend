import useApiRequest from "@/hooks/useApiRequest";
import { nodeApi } from "@/reactquery/apiClients";
import { useMutation } from "@tanstack/react-query";

export default function useDownloadFile() {
    const apiRequest = useApiRequest();

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
