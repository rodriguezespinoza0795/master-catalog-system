import { Header } from "@/components/common/Header";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default PrivateLayout;
