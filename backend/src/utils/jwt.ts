// src/utils/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../libs/prisma";
import { randomUUID } from "crypto";
import { env } from "../config/env";

/**
 * Converte "7d", "15m", "3600000" (ms) para milissegundos.
 * Sem erros de types: usa RegExp.exec com guarda de null.
 */
export function toMs(str: string): number {
  const m = /^(\d+)([smhd])$/.exec(str);
  if (!m) {
    const n = Number(str);
    return Number.isFinite(n) ? n : 0;
  }
  const value = Number(m[1]);
  const unit = m[2] as "s" | "m" | "h" | "d";

  switch (unit) {
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    default:  return value;
  }
}

/**
 * Assina o access token. O cast `as any` evita o erro de tipo em `expiresIn`
 * (as definições novas pedem `ms.StringValue`).
 */
export function signAccessToken(userId: number, role: string) {
  const payload = { sub: userId, role };
  const options: SignOptions = {
    expiresIn: (env.ACCESS_TOKEN_TTL || "15m") as any,
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
}

/**
 * Cria e persiste um Refresh Token (UUID) e retorna apenas o id.
 */
export async function signRefreshToken(userId: number) {
  const id = randomUUID();

  await prisma.refreshToken.create({
    data: {
      id,
      userId,
      expiresAt: new Date(Date.now() + toMs(env.REFRESH_TOKEN_TTL || "7d")),
    },
  });

  return id;
}
