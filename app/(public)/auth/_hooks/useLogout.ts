import { ResponseError } from "@/api";
import { useAuth } from "@/components/auth/AuthProvider";
import { authApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
    const { logoutAct } = useAuth();

    return useMutation({
        mutationFn: async () => {
            try {
                return await authApi.authLogoutPost(
                    {},
                    {
                        credentials: "include",
                    }
                );
            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },

        onSuccess: () => {
            logoutAct();
        },
    });
}
