import { CreateSphereRequest, CreateSphereResponse, ResponseError } from "@/api";
import { useAuth } from "@/components/auth/AuthProvider";
import { sphereApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation } from "@tanstack/react-query";



export default function useCreateSphere() {
    return useMutation({
        mutationFn: async (request: CreateSphereRequest ) => {
            try {
            const response = await sphereApi.spherePost({
                    createSphereRequest: request,
                },

            )
            return response;
            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },
    })
}