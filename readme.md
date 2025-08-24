# 📚 Nova Plataforma de Cursos / New Course Platform

Uma plataforma moderna de cursos online, construída com **Node.js, Prisma, PostgreSQL, React e TailwindCSS**.  
Foco em **escalabilidade, segurança e experiência de usuário fluida**.

A modern online learning platform built with **Node.js, Prisma, PostgreSQL, React, and TailwindCSS**.  
Focused on **scalability, security, and smooth user experience**.

---

## 🚀 Tech Stack

### Backend

- Node.js + Express (API RESTful)
- TypeScript
- Prisma ORM + PostgreSQL
- JWT + Refresh Tokens (Auth)
- RBAC (controle de permissões por role / Role-Based Access Control)

### Frontend

- React + Vite + TypeScript
- TailwindCSS
- Axios (com interceptors para JWT / with JWT interceptors)

---

## ✅ Funcionalidades Concluídas / Completed Features

### Backend

- API base rodando em `/api` / Base API running at `/api`
- Health check em `/api/health`
- Prisma ORM com schema completo / Prisma ORM with complete schema:
  - **User** (role: `ADMIN | TEACHER | USER`)
  - **Course** (slug, nível/level, status)
  - **Lesson** (ordem/order, vídeo/video provider, videoId)
- Autenticação completa / Full Authentication (Step 1):
  - Login com `accessToken` e `refreshToken`
  - Refresh de tokens / Token refresh
  - Logout com invalidação do refresh token / Refresh token invalidation
  - Middleware de autenticação / Authentication middleware
  - Middleware de autorização (RBAC) / Authorization middleware (RBAC)
  - Tipagem estendida de `req.user` no Express / Extended typing for `req.user` in Express
- **CRUD de Usuários (restrito a ADMIN) / User CRUD (ADMIN only)**
  - Listar / List all users
  - Criar / Create user
  - Atualizar / Update user
  - Deletar / Delete user (com mensagens customizadas / with custom response messages)

### Frontend

- Projeto base configurado (React + Vite + TS + Tailwind) / Base project setup
- Integração inicial com API / Initial API integration
- Teste de login funcionando / Login test working

---

## 📌 Próximos Passos / Next Steps

- **CRUD de Cursos e Aulas (ADMIN/TEACHER) / Course & Lesson CRUD (ADMIN/TEACHER)**
  - Admin/Teacher criam e editam cursos / Admins & Teachers can create and edit courses
  - Usuários podem consumir aulas / Users can access lessons
- **Integração Frontend com autenticação JWT + refresh automático / Frontend integration with JWT auth + auto-refresh**
- **Painel Administrativo / Admin Dashboard** (gestão de cursos, professores e alunos / manage courses, teachers, and students)
- **Placeholder de AdSense/Ads**
- **Planejamento de Deploy / Deployment Plan** (Render/Vercel + PostgreSQL gerenciado / managed PostgreSQL)

---

## 📂 Estrutura Atual / Current Structure

backend/
src/
config/
controllers/
libs/
middlewares/
modules/
auth/
user/
routes/
types/
utils/
prisma/
package.json

frontend/
src/
components/
pages/
services/
styles/
package.json

---

## 📊 Status do Projeto / Project Status

🔄 Em desenvolvimento – backend com autenticação robusta e **CRUD de usuários já funcional**, integração inicial do frontend confirmada.  
🎯 Próxima meta: CRUD de Cursos e Aulas restrito a ADMIN/TEACHER.

🔄 In progress — backend with robust authentication and **user CRUD fully functional**, initial frontend integration confirmed.  
🎯 Next goal: Course & Lesson CRUD restricted to ADMIN/TEACHER.
