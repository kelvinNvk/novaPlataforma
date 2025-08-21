import { prisma } from "../libs/prisma";

export const userRepo = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => prisma.user.create({ data }),
};
