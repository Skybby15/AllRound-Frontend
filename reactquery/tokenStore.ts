let accessToken: string | null = null;

export function setWideAccessToken(token: string | null) {
    accessToken = token;
}

export function getWideAccessToken(): string {
    if (!accessToken) {
        throw new Error("No access token available");
    }

    return accessToken;
}