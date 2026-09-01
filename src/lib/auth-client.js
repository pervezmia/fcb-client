import { createAuthClient } from "better-auth/react";
import { baseURL } from "./core/core";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession } = authClient;

