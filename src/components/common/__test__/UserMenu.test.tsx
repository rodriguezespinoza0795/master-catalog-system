import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UserMenu from "../Header/UserMenu";

jest.mock("../Header/useHeader", () => ({
  __esModule: true,
  default: () => ({
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://avatar.com/john.jpg",
    },
  }),
}));

describe("UserMenu", () => {
  it("show dropdown when click on avatar", async () => {
    const user = userEvent.setup();

    const container = document.createElement("div");
    document.body.appendChild(container);

    render(<UserMenu />, { container });

    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();

    // The content should not be visible before
    expect(
      screen.queryByTestId("dropdown-menu-content")
    ).not.toBeInTheDocument();

    // Simulate the click
    await user.click(avatarButton);

    // Wait for the dropdown to appear
    const dropdown = await screen.findByRole("menu");

    expect(dropdown).toBeVisible();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });
});
