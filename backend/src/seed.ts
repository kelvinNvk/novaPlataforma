import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // 1. Criar usuário ADMIN
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword", // depois vamos trocar por bcrypt
      role: "ADMIN",
    },
  });

  console.log("✅ Usuário admin criado:", admin.email);

  // 2. Criar curso
  const course = await prisma.course.create({
    data: {
      title: "Curso de Node.js",
      slug: "curso-node",
      description: "Aprenda Node.js com exemplos práticos",
      level: "beginner", // precisa ser minúsculo igual no schema
      status: "published",
      language: "pt",
      lessons: {
        create: [
          {
            title: "Introdução ao Node.js",
            order: 1,
            videoProvider: "youtube",
            videoId: "abc123",
            durationSec: 600,
          },
          {
            title: "Configuração do Ambiente",
            order: 2,
            videoProvider: "youtube",
            videoId: "def456",
            durationSec: 800,
          },
        ],
      },
    },
  });

  console.log("✅ Curso criado:", course.title);

  // 3. Criar refresh token para o admin
  const refreshToken = await prisma.refreshToken.create({
    data: {
      id: crypto.randomUUID(), // JTI
      userId: admin.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 dias
    },
  });

  console.log("✅ Refresh token criado para admin:", refreshToken.id);

  console.log("🌱 Seed concluído com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
