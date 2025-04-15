import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useResetPassword } from "../../ResetPassword/useResetPassword";
import axios from "axios";
import { toast } from "sonner";

// // // Mocks
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

describe("useResetPassword", () => {
  it("should call router.replace on success", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Password reset successfully",
      },
    });
    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        confirmationCode: "123456",
        password: "@validPassword123",
        confirmPassword: "@validPassword123",
      });
    });
    expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
  });
  it("should show error toast if login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UsernameExistsException",
        },
      },
    });
    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        email: "fail@test.com",
        confirmationCode: "123456",
        password: "@validPassword123",
        confirmPassword: "@validPassword123",
      });
    });
    expect(mockedToast.error).toHaveBeenCalledWith(
      "Account already exists",
      expect.objectContaining({})
    );
  });
});
