import { Request, Response } from "express";
import { prisma } from "../../libs/prisma";

export async function listUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true },
    orderBy: { id: "asc" },
  });

  return res.json(users);
}
