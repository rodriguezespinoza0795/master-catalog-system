import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterPage from "@/app/(public)/auth/register/page";
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
describe("Render Register Form", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
  it("should render the register form", () => {
    render(<RegisterPage />, { wrapper });
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm password")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Should show password when click on show confirm password button", () => {
    render(<RegisterPage />, { wrapper });

    const confirmPasswordInput = screen.getByLabelText(
      "Confirm password"
    ) as HTMLInputElement;
    expect(confirmPasswordInput.type).toBe("password");
    const showPasswordButton = screen.getAllByTestId("icon-eye");
    fireEvent.click(showPasswordButton[1]);
    expect(confirmPasswordInput.type).toBe("text");
  });

  it("should show error message when fields are empty", async () => {
    render(<RegisterPage />, { wrapper });
    const registerButton = screen.getByText("Sign up");
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm password is required")
      ).toBeInTheDocument();
    });
  });

  it("should show error message when fields format are invalid", async () => {
    render(<RegisterPage />, { wrapper });

    const nameInput = screen.getByLabelText("Full name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(nameInput, { target: { value: "invalid-name" } });
    fireEvent.change(passwordInput, { target: { value: "invalid-password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "no-match-password" },
    });

    const registerButton = screen.getByText("Sign up");
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(screen.getByText("Email is invalid")).toBeInTheDocument();
      expect(screen.getByText("Full name is invalid")).toBeInTheDocument();
      expect(screen.getByText("Password is too weak")).toBeInTheDocument();
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });
  it("should show error message when email is already in use", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          name: "UsernameExistsException",
        },
      },
    });
    render(<RegisterPage />, { wrapper });
    const nameInput = screen.getByLabelText("Full name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "@validPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "@validPassword123" },
    });

    const registerButton = screen.getByText("Sign up");
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(mockedToast.error).toHaveBeenCalledWith(
        "Account already exists",
        expect.any(Object)
      );
    });
  });

  it("should redirect to verify email page when register is successful", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        message: "User created successfully",
      },
    });
    render(<RegisterPage />, { wrapper });

    const nameInput = screen.getByLabelText("Full name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "@validPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "@validPassword123" },
    });

    const registerButton = screen.getByText("Sign up");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedRouter.replace).toHaveBeenCalledWith(
        "/auth/verify-email?email=test@test.com"
      );
    });
  });
});
