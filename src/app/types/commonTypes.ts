export const blacklistedTokens: Set<string> = new Set();

export type TMiddlewareUser = {
  userId: string; // Unique identifier for the user
  role: string; // Restrict to specific roles
  email: string; // Email address of the user
  iat: number; // Issued at timestamp (UNIX)
  exp: number; // Expiry timestamp (UNIX)
};



export type TMulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};



export type TUploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};


