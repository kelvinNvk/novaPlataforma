// src/modules/user/user.service.ts
import { prisma } from "../../libs/prisma";
import { Role } from "@prisma/client"; // importa o enum

// Define um seletor padrão para nunca retornar senha
const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
};

export class UserService {
  static async getAll() {
    return prisma.user.findMany({ select: userSelect });
  }

  static async create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    return prisma.user.create({
      data,
      select: userSelect,
    });
  }

  static async update(
    id: number,
    data: { name?: string; email?: string; password?: string; role?: Role },
  ) {
    return prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  }

  static async remove(id: number) {
    return prisma.user.delete({
      where: { id },
      select: userSelect,
    });
  }
}
