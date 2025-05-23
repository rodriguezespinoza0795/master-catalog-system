import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmPasswordInput from "../../components/ConfirmPasswordInput";
import { useForm } from "react-hook-form";

const FormWrapper = () => {
  const { control } = useForm();
  return <ConfirmPasswordInput control={control} errors="" />;
};

describe("ConfirmPasswordInput", () => {
  it("should toggle password visibility", () => {
    render(<FormWrapper />);

    const passwordInput = screen.getByLabelText(
      "Confirm password"
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button");

    // Por defecto debe mostrarse el ícono del ojo abierto (oculto)
    expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
    expect(passwordInput.type).toBe("password");

    // Al hacer click cambia a texto y cambia el ícono
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("icon-eye-off")).toBeInTheDocument();
    expect(passwordInput.type).toBe("text");

    // Vuelve al estado original
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
    expect(passwordInput.type).toBe("password");
  });
});
