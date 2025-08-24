// src/seed.ts
import { PrismaClient, Role } from "@prisma/client";
// Se seu tsconfig não tem "esModuleInterop": true, troque para:
//   import * as bcrypt from "bcryptjs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  const passwordHash = await bcrypt.hash("123456", 10);

  // use o enum Role.* em vez de strings
  const users: Array<{ name: string; email: string; role: Role }> = [
    { name: "Admin User", email: "admin@example.com", role: Role.ADMIN },
    { name: "Teacher User", email: "teacher@example.com", role: Role.TEACHER },
    { name: "Student User", email: "student@example.com", role: Role.STUDENT },
    { name: "Basic User", email: "user@example.com", role: Role.USER },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {}, // não atualiza nada se já existir
      create: {
        name: u.name,
        email: u.email,
        password: passwordHash, // campo conforme seu schema
        role: u.role, // enum, não string!
      },
    });
  }

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
