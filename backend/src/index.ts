// src/index.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import "dotenv/config";

import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";

dotenv.config();

//rotas
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo de 100 requisições por IP
  }),
);

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // 🚀 registrando as rotas protegidas de usuários

// Rota de health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Porta do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
