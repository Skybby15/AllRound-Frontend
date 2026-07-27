import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { authApi } from "@/reactquery/apiClients";
import { AuthProvider, useAuth } from "./AuthProvider";

vi.mock("@/reactquery/apiClients", () => ({
    authApi: {
        authRefreshPost: vi.fn(),
    },
}));

function AuthConsumer() {
    const { accessToken, isAuthenticated, isLoading, loginAct, logoutAct } = useAuth();

    return (
        <div>
            <div data-testid="loading">{String(isLoading)}</div>
            <div data-testid="auth">{String(isAuthenticated)}</div>
            <div data-testid="token">{accessToken ?? "none"}</div>
            <button onClick={() => loginAct("new-token")}>login</button>
            <button onClick={() => logoutAct()}>logout</button>
        </div>
    );
}

describe("AuthProvider", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes auth state from the refresh response", async () => {
        vi.mocked(authApi.authRefreshPost).mockResolvedValue({
            accessToken: "from-refresh",
        } as never);

        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        expect(screen.getByTestId("loading").textContent).toBe("true");

        await waitFor(() => expect(screen.getByTestId("auth").textContent).toBe("true"));

        expect(screen.getByTestId("token").textContent).toBe("from-refresh");
        expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    it("clears auth state when refresh fails", async () => {
        vi.mocked(authApi.authRefreshPost).mockRejectedValue(new Error("boom"));

        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        await waitFor(() => expect(screen.getByTestId("auth").textContent).toBe("false"));

        expect(screen.getByTestId("token").textContent).toBe("none");
    });

    it("updates auth state when login and logout actions are used", async () => {
        vi.mocked(authApi.authRefreshPost).mockRejectedValue(new Error("boom"));

        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        await waitFor(() => expect(screen.getByTestId("auth").textContent).toBe("false"));

        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "login" }));
        expect(screen.getByTestId("auth").textContent).toBe("true");
        expect(screen.getByTestId("token").textContent).toBe("new-token");

        await user.click(screen.getByRole("button", { name: "logout" }));
        expect(screen.getByTestId("auth").textContent).toBe("false");
        expect(screen.getByTestId("token").textContent).toBe("none");
    });
});
