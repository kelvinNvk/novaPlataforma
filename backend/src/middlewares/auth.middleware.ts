import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

// Nosso payload do access token: aceitamos sub como string|number
type AccessTokenPayload = JwtPayload & {
  sub: string | number;
  role: string;
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.slice(7); // remove "Bearer "

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;

    // garante que temos sub e role válidos
    const userId =
      typeof decoded.sub === "string" ? Number(decoded.sub) : decoded.sub;

    if (!Number.isFinite(userId) || !decoded.role) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // graças ao arquivo de tipos (src/@types/express/index.d.ts), req.user é tipado
    req.user = { id: userId, role: decoded.role };

    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
