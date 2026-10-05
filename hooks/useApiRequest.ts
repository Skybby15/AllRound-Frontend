import { ErrorResponse, ResponseError } from "@/api";
import { useAuth } from "@/components/auth/AuthProvider";
import { ApiError } from "@/reactquery/ApiError";

export default function useApiRequest() {
    const { refresh } = useAuth();

    return async function apiRequest<T>(
        request: () => Promise<T>,
        retryForToken: boolean = true
    ): Promise<T> {
        try {
            return await request();
        } catch (error) {
            if (error instanceof ResponseError) {
                const status = error.response.status;
                if (status === 401) {
                    if (retryForToken) {
                        const hasAccess = await refresh();
                        
                        if(hasAccess)
                            return await apiRequest(request, false);
                    }

                    throw new ApiError(
                        "UNAUTHORIZED",
                        "Unauthorized access. Please log in again.",
                        new Date().toISOString()
                    );
                }

                const errorResponse =
                    await error.response.json() as ErrorResponse;

                throw new ApiError(
                    errorResponse.code!,
                    errorResponse.message!,
                    errorResponse.timestamp?.toString()!
                );
            }

            throw new Error("Something went wrong.");
        }
    };
}