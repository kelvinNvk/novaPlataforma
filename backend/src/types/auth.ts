import { z } from "zod";

// Schema do payload de Access Token
export const AccessPayloadSchema = z.object({
  sub: z.number(),
  role: z.string(),
});

// Tipo inferido do schema
export type AccessPayload = z.infer<typeof AccessPayloadSchema>;

// Schema do payload de Refresh Token
export const RefreshPayloadSchema = z.object({
  sub: z.number(),
  jti: z.string(),
});

// Tipo inferido do schema
export type RefreshPayload = z.infer<typeof RefreshPayloadSchema>;
