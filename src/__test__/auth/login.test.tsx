import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;

describe("Render Login Form", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  it("should render the login form", () => {
    render(<LoginPage />, { wrapper });
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("Should show password when click on show confirm password button", () => {
    render(<LoginPage />, { wrapper });

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
    const showPasswordButton = screen.getByTestId("icon-eye");
    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe("text");
  });

  it("should show error message when fields are empty", async () => {
    render(<LoginPage />, { wrapper });
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should show error message when email format is invalid", async () => {
    render(<LoginPage />, { wrapper });

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

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

    render(<LoginPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "User not found",
        expect.any(Object)
      );
    });
  });
  it("should show error message when email is not verified", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UserNotConfirmedException",
        },
      },
    });

    render(<LoginPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "Account not verified",
        expect.any(Object)
      );
    });
  });
  it("should show error message when password is incorrect", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "NotAuthorizedException",
        },
      },
    });

    render(<LoginPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "Incorrect credentials",
        expect.any(Object)
      );
    });
  });
  it("should redirect to home page when login is successful", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "Login successful",
      },
    });

    render(<LoginPage />, { wrapper });
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedRouter.replace).toHaveBeenCalledWith("/");
    });
  });
});
