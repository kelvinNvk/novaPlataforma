import { prisma } from "../libs/prisma";

export const refreshTokenRepo = {
  create: (data: {
    id: string;
    userId: number;
    expiresAt: Date;
    replacedByTokenId?: string | null;
  }) => prisma.RefreshToken.create({ data }),

  findById: (id: string) => prisma.refreshToken.findUnique({ where: { id } }),

  revoke: (id: string, replacedByTokenId?: string) =>
    prisma.refreshToken.update({
      where: { id },
      data: {
        revokedAt: new Date(),
        replacedByTokenId: replacedByTokenId ?? null,
      },
    }),
};
