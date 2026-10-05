import { useAuth } from "@/components/auth/AuthProvider";
import useApiRequest from "@/hooks/useApiRequest";
import { authApi } from "@/reactquery/apiClients";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
    const { logoutAct } = useAuth();
    const apiRequest = useApiRequest();

    return useMutation({
        mutationFn: async () => {
            return await apiRequest(()=>{
                return authApi.authLogoutPost(
                    {},
                    {
                        credentials: "include",
                    }
                );
            })
        },

        onSuccess: () => {
            logoutAct();
        },
    });
}
