// import { betterAuth } from "better-auth";
// import { baseURL } from "./core/core";

// export const auth = betterAuth({
//   baseURL,
//   //...other options
//   emailAndPassword: { 
//     enabled: true, 
//   }, 
  
//   socialProviders: { 
//     google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
//         }, 
//   }, 
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("fcb-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    // client
  }),
  socialProviders: { 
    google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
  }, 
    emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
        additionalFields: {
            role: {
                type: "string",  
                defaultValue: "player", // Default role for new signups
                input: false,
            },
            plan: {
              defaultValue: "free"
            }
        }
    }
  
});