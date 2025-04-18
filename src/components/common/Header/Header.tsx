import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-auto flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
