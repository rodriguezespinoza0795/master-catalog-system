import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ForgotPasswordPage from "@/app/(public)/auth/forgot-password/page";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("Render Forgot Password Form", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  it("should render the forgot password form", () => {
    render(<ForgotPasswordPage />, { wrapper });
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Send reset code")).toBeInTheDocument();
    expect(screen.getByText("Back to login")).toBeInTheDocument();
  });
  it("should show error message when fields are empty", async () => {
    render(<ForgotPasswordPage />, { wrapper });
    const resetCodeButton = screen.getByText("Send reset code");
    fireEvent.click(resetCodeButton);
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });
  it("should show error message when email format is invalid", async () => {
    render(<ForgotPasswordPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    const resetCodeButton = screen.getByText("Send reset code");
    fireEvent.click(resetCodeButton);
    await waitFor(() => {
      expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    });
  });
  it("should show error message when email is not found", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotFoundException",
        },
      },
    });
    render(<ForgotPasswordPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    const resetCodeButton = screen.getByText("Send reset code");
    fireEvent.click(resetCodeButton);
    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "User not found",
        expect.any(Object)
      );
    });
  });

  it("should redirect to home page when password reset code is sent", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Password reset code sent",
      },
    });
    render(<ForgotPasswordPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    const resetCodeButton = screen.getByText("Send reset code");
    fireEvent.click(resetCodeButton);
    await waitFor(() => {
      expect(mockedRouter.replace).toHaveBeenCalledWith(
        "/auth/reset-password?email=test@test.com"
      );
    });
  });
});
