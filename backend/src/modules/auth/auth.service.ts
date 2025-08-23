// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { prisma } from "../../libs/prisma";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Credenciais inválidas");

    const accessToken = signAccessToken(user.id, user.role);
    const refreshTokenId = await signRefreshToken(user.id);

    return { accessToken, refreshTokenId };
  }

  async refresh(refreshTokenId: string) {
    const stored = await prisma.refreshToken.findUnique({
      where: { id: refreshTokenId },
      include: { user: true },
    });

    if (!stored) throw new Error("Refresh token inválido");
    if (stored.expiresAt < new Date())
      throw new Error("Refresh token expirado");
    if (stored.revokedAt) throw new Error("Refresh token revogado");

    const newAccessToken = signAccessToken(stored.userId, stored.user.role);
    return { accessToken: newAccessToken };
  }

  async logout(refreshTokenId: string) {
    const stored = await prisma.refreshToken.findUnique({
      where: { id: refreshTokenId },
    });
    if (!stored) throw new Error("Refresh token inválido");

    await prisma.refreshToken.update({
      where: { id: refreshTokenId },
      data: { revokedAt: new Date() },
    });
  }
}
