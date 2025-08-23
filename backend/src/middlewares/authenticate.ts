import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token ausente" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as any;
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
