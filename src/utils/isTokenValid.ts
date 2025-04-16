import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}
