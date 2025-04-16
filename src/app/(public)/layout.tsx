"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/isTokenValid";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const tokensString = sessionStorage.getItem("tokens");
    const tokens = tokensString ? JSON.parse(tokensString) : null;

    if (tokens?.AccessToken && isTokenValid(tokens.AccessToken)) {
      router.replace("/home");
    }
  }, [router]);

  return <>{children}</>;
};

export default PublicLayout;
