import { SignupRequest } from "@/api";
import { authApi } from "@/reactquery/apiClients";
import apiRequest from "@/utils/apiRequest";
import { useMutation } from "@tanstack/react-query";

export default function useSignup() {
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
