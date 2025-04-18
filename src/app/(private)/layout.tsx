import { Header } from "@/components/common/Header";
import Sidebar from "@/components/common/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="flex min-h-screen flex-col w-full">
        <Header />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default PrivateLayout;
