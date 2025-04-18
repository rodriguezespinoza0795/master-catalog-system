"use server";

import { cookies } from "next/headers";

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
