import useApiRequest from "@/hooks/useApiRequest";
import { sphereApi } from "@/reactquery/apiClients";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpheres() {
    const apiRequest = useApiRequest();

    return useQuery({
        queryKey: ["spheres"],
        queryFn: async () => {
            return await apiRequest(() => {
                return sphereApi.sphereGet();
            });
        },
    });
}
