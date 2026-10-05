import { SignupRequest } from "@/api";
import useApiRequest from "@/hooks/useApiRequest";
import { authApi } from "@/reactquery/apiClients";
import { useMutation } from "@tanstack/react-query";

export default function useSignup() {
    const apiRequest = useApiRequest();
    
    return useMutation({
        mutationFn: async (request: SignupRequest) => {
            return await apiRequest(() => {
                return authApi.authSignupPost({
                    signupRequest: request,
                });
            });
        },
    });
}
