// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "./user.service";
import { Role } from "@prisma/client";

// GET /api/users
export async function listUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAll();
    return res.json(users);
  } catch (e: any) {
    console.error("❌ listUsers error:", e);
    return res.status(500).json({ error: "Error fetching users" });
  }
}

// POST /api/users
export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password and name are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserService.create({
      email,
      password: hashedPassword,
      role: (role as Role) || Role.USER, // 👈 se não mandar role, assume USER
      name,
    });

    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });
  } catch (e: any) {
    console.error("❌ createUser error:", e);

    if (e.code === "P2002") {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    return res.status(500).json({ error: "Error creating user" });
  }
}

// PUT /api/users/:id
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, password, role, name } = req.body;

    const data: any = {
      email,
      role: role ? (role as Role) : undefined,
      name,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserService.update(Number(id), data);

    return res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      name: updatedUser.name,
    });
  } catch (e: any) {
    console.error("❌ updateUser error:", e);
    return res.status(500).json({ error: "Error updating user" });
  }
}

// DELETE /api/users/:id
export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await UserService.remove(Number(id));

    return res.status(200).json({
      message: `Usuário ${user.name} deletado com sucesso!`,
      user,
    });
  } catch (e: any) {
    console.error("❌ deleteUser error:", e);

    if (e.code === "P2003") {
      return res.status(400).json({
        error:
          "Não é possível deletar usuário pois ele está vinculado a outros registros.",
      });
    }

    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
}
