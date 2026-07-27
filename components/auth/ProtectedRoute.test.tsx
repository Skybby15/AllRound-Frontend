import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useRouter } from "next/navigation";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthProvider";

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));

vi.mock("./AuthProvider", () => ({
    useAuth: vi.fn(),
}));

describe("ProtectedRoute", () => {
    const replace = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useRouter).mockReturnValue({ replace } as never);
    });

    it("shows a loading state while auth is being checked", () => {
        vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: true } as never);

        render(
            <ProtectedRoute>
                <div>Protected content</div>
            </ProtectedRoute>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("redirects to /auth when the user is not authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, isLoading: false } as never);

        const { container } = render(
            <ProtectedRoute>
                <div>Protected content</div>
            </ProtectedRoute>
        );

        expect(replace).toHaveBeenCalledWith("/auth");
        expect(container).toBeEmptyDOMElement();
    });

    it("renders children when the user is authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, isLoading: false } as never);

        render(
            <ProtectedRoute>
                <div>Protected content</div>
            </ProtectedRoute>
        );

        expect(screen.getByText("Protected content")).toBeInTheDocument();
    });
});
