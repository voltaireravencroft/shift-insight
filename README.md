# Shift Insight Dashboard

**Shift Insight** is a full-stack analytics dashboard for monitoring warehouse and logistics operations.  
It visualizes real-time performance metrics such as **active shifts, stations, and event throughput**, powered by **Next.js**, **Prisma**, and **PostgreSQL**.

---

## Live Demo  
 [https://shift-insight.vercel.app](https://shift-insight.vercel.app)

## Repository  
 [https://github.com/corvuslabs/shift-insight](https://github.com/corvuslabs/shift-insight)

---

## Overview
Shift Insight was designed to demonstrate my ability to build and deploy **data-driven, full-stack applications** using modern web technologies.

Key features include:
- **Responsive dashboard UI** built with Next.js (App Router) and TailwindCSS  
- **Database modeling and ORM** powered by Prisma  
- **PostgreSQL integration** with Docker for local and Neon Cloud for production  
- **Reusable UI components** from shadcn/ui  
- **Seeded data model** representing realistic operational use cases

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| **Backend / ORM** | Prisma |
| **Database** | PostgreSQL (Docker for dev, Neon for production) |
| **Deployment** | Vercel |
| **Tooling** | Turbopack, ESLint, tsx |

---

## Quick Start

**Prerequisites:** Node 18+ and Docker Desktop

```bash
git clone https://github.com/corvuslabs/shift-insight.git
cd shift-insight
docker run --name pgdev -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=appdb -p 5432:5432 -d postgres:16
cp .env.example .env
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
