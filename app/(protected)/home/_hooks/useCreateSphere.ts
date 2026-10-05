import { CreateSphereRequest} from "@/api";
import useApiRequest from "@/hooks/useApiRequest";
import { sphereApi } from "@/reactquery/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateSphere() {
    const queryClient = useQueryClient();
    const apiRequest = useApiRequest();

    return useMutation({
        mutationFn: async (request: CreateSphereRequest) => {
            return await apiRequest(()=>{
                return sphereApi.spherePost({
                    createSphereRequest: request,
                });
            })
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["spheres"],
            });
        },
    });
}
