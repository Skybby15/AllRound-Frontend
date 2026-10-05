import { ResponseError } from "@/api";
import { ApiError } from "@/reactquery/ApiError";
import { ErrorResponse } from "@/reactquery/ErrorResponse";

export default async function apiRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
        return await request();
    } catch (error) {
        if (error instanceof ResponseError) {
            const body = (await error.response.json()) as ErrorResponse;

            throw new ApiError(
                body.code,
                body.message,
                body.timestamp
            );
        }

        throw new Error("Something went wrong.");
    }
}