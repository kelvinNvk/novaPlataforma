import jwt from "jsonwebtoken";
import { env } from "../config/env";
import {
  AccessPayloadSchema,
  AccessPayload,
  RefreshPayloadSchema,
  RefreshPayload,
} from "../types/auth";

export function verifyAccessToken(token: string): AccessPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid access token");
  }

  // Valida com Zod (se falhar, lança erro automaticamente)
  return AccessPayloadSchema.parse(decoded);
}

export function verifyRefreshToken(token: string): RefreshPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid refresh token");
  }

  return RefreshPayloadSchema.parse(decoded);
}
