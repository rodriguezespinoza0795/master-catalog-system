import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useForgotPassword from "../../ForgotPassword/useForgotPassword";
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

jest.mock("next/navigation", () => ({
  useRouter: () => mockedRouter,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useForgotPasswordForm", () => {
  it("should call router.replace on success", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: "success",
    });
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
      });
    });
    expect(mockedRouter.replace).toHaveBeenCalledWith(
      "/auth/reset-password?email=test@test.com"
    );
  });

  it("should show error toast if forgot password fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotFoundException",
        },
      },
    });
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        email: "fail@test.com",
      });
    });
    expect(mockedToast.error).toHaveBeenCalledWith(
      "User not found",
      expect.objectContaining({})
    );
  });
});
