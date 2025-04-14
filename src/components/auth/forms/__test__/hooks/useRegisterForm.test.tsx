import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRegisterForm } from "../../RegisterForm/useRegisterForm";
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
const mockedToast = toast.error as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useRegisterForm", () => {
  it("should call router.replace on success", async () => {
    const tokens = { accessToken: "abc" };
    mockedAxios.post.mockResolvedValueOnce({
      data: { AuthenticationResult: tokens },
    });
    const { result } = renderHook(() => useRegisterForm(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        name: "John Doe",
        email: "test@test.com",
        password: "@validPassword123",
        confirmPassword: "@validPassword123",
      });
    });
    expect(mockedRouter.replace).toHaveBeenCalledWith(
      "/auth/verify-email?email=test@test.com"
    );
  });
  it("should show error toast if login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UsernameExistsException",
        },
      },
    });
    const { result } = renderHook(() => useRegisterForm(), {
      wrapper: createWrapper(),
    });
    await act(async () => {
      await result.current.onSubmit({
        name: "John Doe",
        email: "fail@test.com",
        password: "@validPassword123",
        confirmPassword: "@validPassword123",
      });
    });
    expect(mockedToast).toHaveBeenCalledWith(
      "Account already exists",
      expect.objectContaining({})
    );
  });
});
