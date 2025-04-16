"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/isTokenValid";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tokensString = sessionStorage.getItem("tokens");
    const tokens = tokensString ? JSON.parse(tokensString) : null;

    if (tokens?.AccessToken && isTokenValid(tokens.AccessToken)) {
      setIsAuthenticated(true);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};

export default PrivateLayout;
