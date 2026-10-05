import { CreateSphereRequest} from "@/api";
import { sphereApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateSphere() {
    const queryClient = useQueryClient();

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
