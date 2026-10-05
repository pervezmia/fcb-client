"use client";

import { authClient } from "@/lib/auth-client";

// Client theke Better Auth JWT token ane (server action ke pathanor jonno)
export async function getAuthToken() {
  const { data } = await authClient.token();
  return data?.token || null;
}