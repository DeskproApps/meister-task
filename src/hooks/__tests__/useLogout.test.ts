import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { removeAccessTokenService } from "../../services/deskpro";
import { revokeAccessTokenService } from "../../services/meister-task";
import { useLogout } from "../useLogout";
import type { Result } from "../useLogout";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../services/deskpro/removeAccessTokenService");
jest.mock("../../services/meister-task/revokeAccessTokenService");

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should remove token and navigate to login page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAccessTokenService as jest.Mock).mockResolvedValueOnce("");
    (revokeAccessTokenService as jest.Mock).mockResolvedValueOnce("");

    const { result } = renderHook<Result, unknown>(() => useLogout());

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAccessTokenService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to the login page even if the remove token failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (removeAccessTokenService as jest.Mock).mockRejectedValueOnce("");
    (revokeAccessTokenService as jest.Mock).mockRejectedValueOnce("");

    const { result } = renderHook<Result, unknown>(() => useLogout());

    await act(async () => {
      await result.current.logout();
    })

    expect(removeAccessTokenService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
