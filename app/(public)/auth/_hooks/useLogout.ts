import { useAuth } from "@/components/auth/AuthProvider";
import { authApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
    const { logoutAct } = useAuth();

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
