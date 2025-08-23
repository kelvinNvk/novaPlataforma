import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../libs/prisma";

// ⚡ Config
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";

export class AuthController {
  // 🔑 Login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // Gera accessToken
      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        ACCESS_SECRET,
        { expiresIn: "15m" },
      );

      // Cria refresh no banco (UUID como id)
      const refresh = await prisma.refreshToken.create({
        data: {
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 dias
        },
      });

      return res.json({
        accessToken,
        refreshToken: refresh.id, // retorna UUID
      });
    } catch (e) {
      console.error("Login error:", e);
      return res.status(500).json({ error: "Erro no login" });
    }
  }

  // ♻️ Refresh token
  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ error: "Token requerido" });
      }

      const stored = await prisma.refreshToken.findUnique({
        where: { id: refreshToken },
      });

      if (!stored) {
        return res.status(401).json({ error: "Token inválido" });
      }

      // Verifica expiração
      if (stored.expiresAt < new Date()) {
        return res.status(401).json({ error: "Token expirado" });
      }

      // Gera novo accessToken
      const newAccessToken = jwt.sign(
        { userId: stored.userId },
        ACCESS_SECRET,
        { expiresIn: "15m" },
      );

      return res.json({ accessToken: newAccessToken });
    } catch (e) {
      console.error("Refresh error:", e);
      return res.status(401).json({ error: "Refresh inválido" });
    }
  }

  // 🚪 Logout
  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ error: "Token requerido" });
      }

      await prisma.refreshToken.deleteMany({
        where: { id: refreshToken },
      });

      return res.json({ message: "Logout realizado com sucesso" });
    } catch (e) {
      console.error("Logout error:", e);
      return res.status(500).json({ error: "Erro no logout" });
    }
  }
}
