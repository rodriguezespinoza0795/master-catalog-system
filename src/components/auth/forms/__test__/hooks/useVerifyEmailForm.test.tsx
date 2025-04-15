import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useVerifyEmail } from "../../VerifyEmailForm/useVerifyEmail";
import axios from "axios";
import { toast } from "sonner";

// // Mocks
jest.mock("axios");
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockedRouter = {
  replace: jest.fn(),
};

const mockedSearchParams = {
  get: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockedRouter,
  useSearchParams: () => mockedSearchParams,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useVerifyEmailForm", () => {
  it("should call router.replace on success", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: "test",
    });

    const { result } = renderHook(() => useVerifyEmail(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        confirmationCode: "123456",
      });
    });

    expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
  });

  it("should show error toast if code is wrong", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "CodeMismatchException",
        },
      },
    });

    const { result } = renderHook(() => useVerifyEmail(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "fail@test.com",
        confirmationCode: "123456",
      });
    });

    expect(mockedToast.error).toHaveBeenCalledWith(
      "Invalid verification code",
      expect.objectContaining({})
    );
  });

  it("should show error toast if resend code fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "ResendCodeException",
        },
      },
    });

    const { result } = renderHook(() => useVerifyEmail(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.handleResendCode();
    });

    expect(mockedToast.error).toHaveBeenCalledWith(
      "Something went wrong",
      expect.objectContaining({})
    );
  });
});
