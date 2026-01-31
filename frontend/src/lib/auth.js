import { createAuthClient } from "@neondatabase/neon-js";

export const authClient = createAuthClient({
  authUrl: import.meta.env.VITE_NEON_AUTH_URL, 
});