import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import VerifyEmailPage from "@/app/auth/verify-email/page";
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

describe("Render Verify Email Form", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  it("should render the Verify Email form", () => {
    mockedSearchParams.get.mockReturnValueOnce("test@test.com");
    render(<VerifyEmailPage />, { wrapper });
    expect(screen.getByText("Code verification")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the code to verify your account")
    ).toBeInTheDocument();
    expect(screen.getByText("Verify Code")).toBeInTheDocument();
    expect(screen.getByText("Didn't receive the code?")).toBeInTheDocument();
    expect(screen.getByText("Resend code")).toBeInTheDocument();
    expect(screen.getByText("Back to login")).toBeInTheDocument();
  });
  it("should redirect to login page if email is not provided", () => {
    mockedSearchParams.get.mockReturnValueOnce(null);
    render(<VerifyEmailPage />, { wrapper });
    expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
  });

  it("should show error message when fields are empty", async () => {
    render(<VerifyEmailPage />, { wrapper });
    const loginButton = screen.getByText("Verify Code");
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("Code Confirmation is required")
      ).toBeInTheDocument();
    });
  });

  it("should show error message when code format is invalid", async () => {
    render(<VerifyEmailPage />, { wrapper });
    const codeInput = screen.getByTestId("confirmationCode");
    fireEvent.change(codeInput, { target: { value: "123" } });
    const loginButton = screen.getByText("Verify Code");
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("Code Confirmation must be 6 digits")
      ).toBeInTheDocument();
    });
  });

  it("should show success message when Resend code button is clicked", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Verification code sent",
      },
    });
    render(<VerifyEmailPage />, { wrapper });
    const resendCodeButton = screen.getByText("Resend code");
    fireEvent.click(resendCodeButton);
    await waitFor(() => {
      expect(mockedToast.success).toHaveBeenCalledWith(
        "Verification code sent",
        expect.any(Object)
      );
    });
  });

  it("should show error message when email is not found", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "CodeMismatchException",
        },
      },
    });

    render(<VerifyEmailPage />, { wrapper });
    const codeInput = screen.getByTestId("confirmationCode");
    fireEvent.change(codeInput, { target: { value: "123456" } });
    const loginButton = screen.getByText("Verify Code");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "Invalid verification code",
        expect.any(Object)
      );
    });
  });

  it("should redirect to home page when login is successful", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Verification code verified",
      },
    });

    render(<VerifyEmailPage />, { wrapper });
    const codeInput = screen.getByTestId("confirmationCode");
    fireEvent.change(codeInput, { target: { value: "123456" } });

    const loginButton = screen.getByText("Verify Code");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
    });
  });

  it("should redirect to login page clicking on back to login", () => {
    render(<VerifyEmailPage />, { wrapper });
    const backToLoginButton = screen.getByText("Back to login");
    fireEvent.click(backToLoginButton);
    expect(mockedRouter.replace).toHaveBeenCalledWith("/auth/login");
  });
});
