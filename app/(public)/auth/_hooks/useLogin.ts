import { LoginRequest } from "@/api";
import { useAuth } from "@/components/auth/AuthProvider";
import { authApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
    const { loginAct } = useAuth();

    return useMutation({
        mutationFn: async (request: LoginRequest) => {
            return await apiRequest(() =>
            {
                return authApi.authLoginPost(
                    {
                        loginRequest: request,
                    },
                    {
                        credentials: "include",
                    }
                );
            })
        },

        onSuccess: (response) => {
            loginAct(response.accessToken);
        },
    });
}
