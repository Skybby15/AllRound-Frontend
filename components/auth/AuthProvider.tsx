"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { authApi } from "@/reactquery/apiClients";

type AuthContextType = {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    loginAct: (accessToken: string) => void;
    logoutAct: () => void;
    refresh: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loginAct = useCallback((token: string) => {
        setAccessToken(token);
    }, []);

    const logoutAct = useCallback(() => {
        setAccessToken(null);
    }, []);

    const refresh = useCallback(async (): Promise<boolean> => {
        try {
            const response = await authApi.authRefreshPost(
                {},
                {
                    credentials: "include",
                }
            );

            setAccessToken(response.accessToken);
            return true;
        } catch {
            setAccessToken(null);
            return false;
        }
    }, []);

    useEffect(() => {
        async function initialize() {
            await refresh();
            setIsLoading(false);
        }

        initialize();
    }, [refresh]);

    const value = useMemo(
        () => ({
            accessToken,
            isAuthenticated: accessToken !== null,
            isLoading,
            loginAct,
            logoutAct,
            refresh,
        }),
        [accessToken, isLoading, loginAct, logoutAct, refresh]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}
