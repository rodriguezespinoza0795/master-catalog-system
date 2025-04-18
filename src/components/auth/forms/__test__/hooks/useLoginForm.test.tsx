import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLoginForm } from "../../LoginForm/useLoginForm";
import axios from "axios";
import { toast } from "sonner";

// Mocks
jest.mock("axios");
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockedRouter = {
  replace: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockedRouter,
}));

jest.mock("@/lib/session", () => ({
  createSession: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLoginForm", () => {
  it("should call router.replace on success", async () => {
    const tokens = { accessToken: "abc" };
    mockedAxios.post.mockResolvedValueOnce({
      data: { AuthenticationResult: tokens },
    });

    const { result } = renderHook(() => useLoginForm(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "123456",
      });
    });

    expect(sessionStorage.getItem("tokens")).toBe(JSON.stringify(tokens));
    expect(mockedRouter.replace).toHaveBeenCalledWith("/home");
  });

  it("should show error toast if login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotFoundException",
        },
      },
    });

    const { result } = renderHook(() => useLoginForm(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "fail@test.com",
        password: "wrongpass",
      });
    });

    expect(mockedToast.error).toHaveBeenCalledWith(
      "User not found",
      expect.objectContaining({})
    );
  });

  it("should redirect to verify-email if user is not confirmed", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotConfirmedException",
        },
      },
    });

    const { result } = renderHook(() => useLoginForm(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "unconfirmed@test.com",
        password: "123456",
      });
    });

    expect(mockedRouter.replace).toHaveBeenCalledWith(
      "/auth/verify-email?email=unconfirmed@test.com"
    );
  });
  it("should show generic error when an unknown error occurs", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {},
      },
    });

    const { result } = renderHook(() => useLoginForm(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "unknown@test.com",
        password: "123456",
      });
    });

    expect(mockedToast.error).toHaveBeenCalledWith(
      "Something went wrong",
      expect.any(Object)
    );
  });
});
