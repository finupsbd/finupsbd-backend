import { NextFunction, Request, Response } from "express";
import { ConfigFile } from "../../config";

export function authDoc(req: Request, res: Response, next: NextFunction) {
  const auth = req.query.key; // বা req.query.secret
  console.log(auth)
  if (!auth || auth !== ConfigFile.API_DOC_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
