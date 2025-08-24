// src/modules/user/user.routes.ts
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/authorize";

import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller";

const router = Router();

router.use(authenticate, requireRole("ADMIN"));

router.get("/", listUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
