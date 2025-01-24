export const blacklistedTokens: Set<string> = new Set();

export type TMiddlewareUser = {
  userId: string; // Unique identifier for the user
  role: string; // Restrict to specific roles
  email: string; // Email address of the user
  iat: number; // Issued at timestamp (UNIX)
  exp: number; // Expiry timestamp (UNIX)
};
