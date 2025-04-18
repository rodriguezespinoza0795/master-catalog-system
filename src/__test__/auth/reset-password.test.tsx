import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ResetPasswordPage from "@/app/(public)/auth/reset-password/page";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // Mocks
jest.mock("axios");
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
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
describe("Render Reset Password Form", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  it("should render the reset password form", () => {
    render(<ResetPasswordPage />, { wrapper });
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm password")).toBeInTheDocument();
    expect(screen.getByText("Reset password")).toBeInTheDocument();
    expect(screen.getByText("Back to login")).toBeInTheDocument();
  });

  it("should show error message when fields are empty", async () => {
    render(<ResetPasswordPage />, { wrapper });
    const resetPasswordButton = screen.getByText("Reset password");
    fireEvent.click(resetPasswordButton);
    await waitFor(() => {
      expect(
        screen.getByText("Code Confirmation is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm password is required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Confirm password is required")
      ).toBeInTheDocument();
    });
  });

  it("should show error message when fields format are invalid", async () => {
    render(<ResetPasswordPage />, { wrapper });

    const codeConfirmationInput = screen.getByTestId("confirmationCode");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    fireEvent.change(codeConfirmationInput, {
      target: { value: "123" },
    });
    fireEvent.change(passwordInput, { target: { value: "invalid-password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "no-match-password" },
    });

    const registerButton = screen.getByText("Reset password");
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(
        screen.getByText("Code Confirmation must be 6 digits")
      ).toBeInTheDocument();
      expect(screen.getByText("Password is too weak")).toBeInTheDocument();
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  it("should show error message when email not found", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotFoundException",
        },
      },
    });
    render(<ResetPasswordPage />, { wrapper });
    const codeConfirmationInput = screen.getByTestId("confirmationCode");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    fireEvent.change(codeConfirmationInput, {
      target: { value: "123456" },
    });
    fireEvent.change(passwordInput, { target: { value: "@validPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "@validPassword123" },
    });

    const registerButton = screen.getByText("Reset password");
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "User not found",
        expect.any(Object)
      );
    });
  });

  it("should redirect to login page when reset password is successful", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Password reset successfully",
      },
    });
    render(<ResetPasswordPage />, { wrapper });
    const codeConfirmationInput = screen.getByTestId("confirmationCode");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    fireEvent.change(codeConfirmationInput, {
      target: { value: "123456" },
    });
    fireEvent.change(passwordInput, { target: { value: "@validPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "@validPassword123" },
    });

    const forgotPasswordButton = screen.getByText("Reset password");
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
    });
  });
});
