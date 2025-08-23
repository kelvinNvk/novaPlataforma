// src/modules/user/user.routes.ts
import { Router } from "express";
import { listUsers } from "./user.controller";
import { authenticate } from "../../middlewares/authenticate";
import { requireRole } from "../../middlewares/authorize";

export const userRoutes = Router();

// 🔐 só ADMIN pode listar usuários
userRoutes.get("/", authenticate, requireRole("ADMIN"), listUsers);