export class ApiError extends Error implements ErrorResponse {
    constructor(
        public code: string,
        message: string,
        public timestamp: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}
