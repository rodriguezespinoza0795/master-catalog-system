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
  it("muestra el dropdown al hacer click en el avatar", async () => {
    const user = userEvent.setup();

    const container = document.createElement("div");
    document.body.appendChild(container);

    render(<UserMenu />, { container });

    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();

    // El contenido no debería estar visible antes
    expect(
      screen.queryByTestId("dropdown-menu-content")
    ).not.toBeInTheDocument();

    // Simula el click
    await user.click(avatarButton);

    // Espera que aparezca el dropdown
    const dropdown = await screen.findByRole("menu");

    expect(dropdown).toBeVisible();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });
});
