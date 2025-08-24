// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../prisma";
import { env } from "../../config/env";
import msLib from "ms";

/** Força o overload de string do pacote `ms` e retorna milissegundos (number). */
function msFromString(str: string): number {
  // força a assinatura (value: string) => number
  const fn = msLib as unknown as (value: string) => number;
  const out = fn(str);
  if (typeof out !== "number" || !Number.isFinite(out)) {
    throw new Error(`TTL inválido: ${str}`);
  }
  return out;
}

/** Converte TTL estilo "15m"/"7d" em **segundos** (number) para usar no JWT. */
function ttlToSeconds(ttl: string | undefined, fallback = "15m"): number {
  const raw = ttl && ttl.trim() ? ttl.trim() : fallback;
  const inMs = msFromString(raw); // milissegundos
  return Math.max(1, Math.floor(inMs / 1000)); // JWT aceita number em segundos
}

export class AuthController {
  // POST /api/auth/login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      // 1) Busca usuário
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(401).json({ error: "Credenciais inválidas" });

      // 2) Valida senha
      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ error: "Credenciais inválidas" });

      // 3) Gera access token (exp em segundos)
      const accessOpts: SignOptions = {
        expiresIn: ttlToSeconds(env.ACCESS_TOKEN_TTL, "15m"),
      };

      const accessToken = jwt.sign(
        { sub: user.id.toString(), role: user.role },
        env.JWT_ACCESS_SECRET as string,
        accessOpts,
      );

      // 4) Cria refresh no banco
      const refreshTtlMs = msFromString(env.REFRESH_TOKEN_TTL || "7d");
      const expiresAt = new Date(Date.now() + refreshTtlMs);

      const refresh = await prisma.refreshToken.create({
        data: { userId: user.id, expiresAt },
      });

      return res.json({
        accessToken,
        refreshToken: refresh.id, // UUID salvo no banco
      });
    } catch (e) {
      console.error("Login error:", e);
      return res.status(500).json({ error: "Erro no login" });
    }
  }

  // POST /api/auth/refresh
  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body as { refreshToken?: string };
      if (!refreshToken)
        return res.status(400).json({ error: "Token requerido" });

      const stored = await prisma.refreshToken.findUnique({
        where: { id: refreshToken },
        include: { user: true },
      });
      if (!stored) return res.status(401).json({ error: "Refresh inválido" });
      if (stored.expiresAt < new Date())
        return res.status(401).json({ error: "Refresh expirado" });

      const accessOpts: SignOptions = {
        expiresIn: ttlToSeconds(env.ACCESS_TOKEN_TTL, "15m"),
      };

      const newAccessToken = jwt.sign(
        { sub: stored.userId.toString(), role: stored.user.role },
        env.JWT_ACCESS_SECRET as string,
        accessOpts,
      );

      return res.json({ accessToken: newAccessToken });
    } catch (e) {
      console.error("Refresh error:", e);
      return res.status(401).json({ error: "Refresh inválido" });
    }
  }

  // POST /api/auth/logout
  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body as { refreshToken?: string };
      if (!refreshToken)
        return res.status(400).json({ error: "Token requerido" });

      await prisma.refreshToken.delete({ where: { id: refreshToken } });
      return res.json({ message: "Logout realizado com sucesso" });
    } catch (e) {
      console.error("Logout error:", e);
      return res.status(500).json({ error: "Erro no logout" });
    }
  }
}
