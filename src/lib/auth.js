import { betterAuth } from "better-auth";
import { baseURL } from "./core/core";

export const auth = betterAuth({
  baseURL,
  //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
  
  socialProviders: { 
    google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
  }, 
});