import { headers } from "next/headers";

export const getTokenServer = async () => {
  const requestHeaders = await headers();

  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
    headers: { cookie: requestHeaders.get("cookie") ?? "" },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const { token } = await res.json();
  return token;
};