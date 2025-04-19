import Sidebar from "../sidebar/Sidebar";
import { render, screen, fireEvent } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";

const mockedRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockedRouter,
}));

describe("Sidebar", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>{children}</SidebarProvider>
  );
  it("should render the sidebar", async () => {
    render(<Sidebar />, { wrapper });

    expect(screen.getByText("Master Catalog")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("CATALOGS")).toBeInTheDocument();

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Suppliers")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Organizations")).toBeInTheDocument();

    expect(screen.getByText("SYSTEM")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("should render the sidebar with the correct modules", async () => {
    render(<Sidebar />, { wrapper });

    const productsButton = screen.getByText("Products");
    const suppliersButton = screen.getByText("Suppliers");
    const customersButton = screen.getByText("Customers");
    const documentsButton = screen.getByText("Documents");
    const organizationsButton = screen.getByText("Organizations");

    // Test collapsible functionality
    expect(productsButton).toBeInTheDocument();
    expect(suppliersButton).toBeInTheDocument();
    expect(customersButton).toBeInTheDocument();
    expect(documentsButton).toBeInTheDocument();
    expect(organizationsButton).toBeInTheDocument();

    fireEvent.click(productsButton);

    expect(screen.getByText("Sizes")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();

    fireEvent.click(suppliersButton);
    expect(screen.getByText("Types")).toBeInTheDocument();
    const typesButton = screen.getByText("Types");
    fireEvent.click(typesButton);

    fireEvent.click(customersButton);
    expect(screen.getByText("Segments")).toBeInTheDocument();
    expect(screen.getByText("Contact Methods")).toBeInTheDocument();

    fireEvent.click(organizationsButton);
    expect(screen.getByText("Departments")).toBeInTheDocument();

    const departmentsButton = screen.getByText("Departments");
    fireEvent.click(departmentsButton);
  });
});
