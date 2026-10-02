import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { baseURL } from "./core/core";

export const authClient = createAuthClient({
  baseURL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;