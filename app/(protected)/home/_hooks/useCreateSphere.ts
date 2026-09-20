import { CreateSphereRequest, ResponseError } from "@/api";
import { sphereApi } from "@/reactquery/apiClients";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateSphere() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: CreateSphereRequest) => {
            try {
                const response = await sphereApi.spherePost({
                    createSphereRequest: request,
                });
                return response;
            } catch (error) {
                if (error instanceof ResponseError) {
                    const body = (await error.response.json()) as ErrorResponse;

                    throw new ApiError(body.code, body.message, body.timestamp);
                }

                throw new Error("Something went wrong.");
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["spheres"],
            });
        },
    });
}
