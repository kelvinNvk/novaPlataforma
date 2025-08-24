PT-BR:

📚 Nova Plataforma de Cursos

Uma plataforma moderna de cursos online, construída com Node.js, Prisma, PostgreSQL, React e TailwindCSS.
Foco em escalabilidade, segurança e experiência de usuário fluida.

🚀 Tech Stack

Backend

Node.js + Express (API RESTful)

TypeScript

Prisma ORM + PostgreSQL

JWT + Refresh Tokens (Auth)

RBAC (controle de permissões por role)

Frontend

React + Vite + TypeScript

TailwindCSS

Axios (com interceptors para JWT)

✅ Funcionalidades Concluídas
Backend

API base rodando em /api

Health check em /api/health

Prisma ORM com schema completo:

User (com role: ADMIN | TEACHER | USER)

Course (com slug, nível, status)

Lesson (com ordem, vídeo, provider)

Autenticação completa (Etapa 1)

Login com geração de accessToken e refreshToken

Refresh de tokens

Logout com invalidação do refresh token

Middleware de autenticação

Middleware de autorização (RBAC)

Tipagem estendida de req.user no Express

Frontend

Projeto base configurado (React + Vite + TS + Tailwind)

Integração inicial com API

Teste de login funcionando

📌 Próximos Passos

CRUD de Usuários (restrito a ADMIN)

Listar, criar, atualizar e deletar usuários

CRUD de Cursos e Aulas (ADMIN/TEACHER)

Admin/Teacher criam e editam cursos

Usuários podem consumir aulas

Integração Frontend com autenticação JWT + Refresh automático

Painel Administrativo (gestão de cursos, professores e alunos)

Placeholder de AdSense/Ads

Planejamento de Deploy (Render/Vercel + banco PostgreSQL gerenciado)

📂 Estrutura Atual
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

📊 Status do Projeto

🔄 Em desenvolvimento – backend com autenticação robusta já funcional, integração inicial do frontend confirmada.
Próxima meta: CRUD de Usuários restrito a ADMIN.

---

## 📈 Status do Projeto

Este projeto está em **desenvolvimento ativo**.  
O objetivo é fornecer uma **plataforma de aprendizado segura, escalável e fácil de usar**.

---

-//- ------------------------------------- -//-

ENG:

📚 New Course Platform

A modern online learning platform built with Node.js, Prisma, PostgreSQL, React, and TailwindCSS.
Focused on scalability, security, and a smooth user experience.

🚀 Tech Stack

Backend

Node.js + Express (REST API)

TypeScript

Prisma ORM + PostgreSQL

JWT + Refresh Tokens (Authentication)

RBAC (Role-Based Access Control)

Frontend

React + Vite + TypeScript

TailwindCSS

Axios (with interceptors for JWT)

✅ Completed Features
Backend

Base API running on /api

Health check at /api/health

Prisma ORM with complete schema:

User (with role: ADMIN | TEACHER | USER)

Course (with slug, level, status)

Lesson (with order, video provider, video id)

Full Authentication (Step 1)

Login with accessToken and refreshToken generation

Token refresh

Logout with refresh token invalidation

Authentication middleware

Authorization middleware (RBAC)

Extended typing for req.user in Express

Frontend

Base project setup (React + Vite + TS + Tailwind)

Initial API integration

Login test working

📌 Next Steps

User CRUD (ADMIN only)

List, create, update, and delete users

Course & Lesson CRUD (ADMIN/TEACHER)

Admin/Teacher can create and edit courses

Users can access lessons

Frontend integration with JWT auth + automatic refresh

Admin Dashboard (manage courses, teachers, and students)

AdSense/Ads placeholder

Deployment Plan (Render/Vercel + managed PostgreSQL)

📂 Current Structure
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

📊 Project Status

🔄 In progress — backend with robust authentication already functional, initial frontend integration confirmed.
Next goal: User CRUD restricted to ADMIN.

---

## 📈 Project Status

This project is under **active development**.  
The goal is to provide a **secure, scalable, and user-friendly learning platform**.

---
