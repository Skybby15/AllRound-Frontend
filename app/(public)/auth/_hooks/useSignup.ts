import { ResponseError, SignupRequest } from "@/api";
import { authApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation } from "@tanstack/react-query";

export default function useSignup() {
    return useMutation({
        mutationFn: async (request: SignupRequest) => {
            try {
                return await authApi.authSignupPost({
                    signupRequest: request,
                });
            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },
    });
}
