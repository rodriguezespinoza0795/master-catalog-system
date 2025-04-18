"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useHeader = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const tokens = sessionStorage.getItem("tokens");
    const tokensData = JSON.parse(tokens || "{}");
    if (tokens) {
      const decodedToken: any = jwtDecode(tokensData.IdToken);
      setUser({
        name: decodedToken.name,
        email: decodedToken.email,
        avatar: "",
      });
    }
  }, []);

  return { user };
};

export default useHeader;
