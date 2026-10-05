import { sphereApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpheres() {
    return useQuery({
        queryKey: ["spheres"],
        queryFn: async () => {
            return await apiRequest(() => {
                return sphereApi.sphereGet();
            });
        },
    });
}
