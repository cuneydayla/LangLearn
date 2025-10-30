# 🌍 LangLearn

A full-stack **Language Learning Platform** built with **Angular** and **Node.js + Prisma**.  
Users can register, browse language courses, enroll, and track their progress — all from a modern responsive interface.

---

## 🚀 Features

✅ **User Authentication** — Sign up, log in, and log out securely  
✅ **Course Management** — View and enroll in available language courses  
✅ **Progress Tracking** — Track lesson completion and quiz performance  
✅ **Responsive Design** — Works beautifully on desktop and mobile  
✅ **Backend API** — Node.js + Prisma + SQLite for easy setup  
✅ **Auto-Seeded Database** — Starts with demo users and courses  
✅ **One-Command Startup** — Installs everything and runs both servers together

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| **Frontend**  | Angular 18 + Angular Material     |
| **Backend**   | Node.js + Express + Prisma ORM    |
| **Database**  | SQLite (auto-seeded)              |
| **Styling**   | SCSS + Responsive Grid            |
| **Dev Tools** | Concurrently, Nodemon, TypeScript |

---

## ⚙️ Quick Start

Clone and run the app in **one line** 🚀

```bash
git clone https://github.com/<your-username>/LangLearn.git
cd LangLearn
npm install
npm run dev
```

Then open 👉 **[http://localhost:4200](http://localhost:4200)**

---

## 💾 Database Info

Every time you run the project, the backend automatically:

- 🧹 Resets the SQLite database
- 🌱 Seeds it with demo data

You’ll start with:

- **User:** `demo@langlearn.dev`
- **Password:** `demo1234`

### Seeded Demo Courses:

| Title                                             | Instructor  | Difficulty |
| ------------------------------------------------- | ----------- | ---------- |
| Spanish A1 – Basics                               | Ana García  | Beginner   |
| Japanese N5 – Introduction to Hiragana & Katakana | Yuki Tanaka | Beginner   |

---

## 🧰 Scripts Overview

At project root (`LangLearn/`):

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `npm install`      | Installs both frontend and backend dependencies      |
| `npm run dev`      | Runs backend (Node.js) + frontend (Angular) together |
| `npm run server`   | Runs only the Node.js backend                        |
| `npm run frontend` | Runs only the Angular frontend                       |

In `/nodejs/` backend:

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Starts backend in dev mode (auto resets DB & seeds) |
| `npm run db:reset` | Drops & recreates database with seed data           |
| `npm run seed`     | Seeds data manually                                 |

---

## 🧪 Test Login

You can immediately log in with the demo credentials:

| Email            | Password |
| ---------------- | -------- |
| demo@langlearn.dev | demo1234 |

---

## 🧠 Reviewer Notes

- Backend API runs on: **http://localhost:4000**
- Frontend Angular app runs on: **http://localhost:4200**
- All errors (auth, enroll, etc.) are shown via in-app snackbar

---

## 🧾 License

MIT © 2025 — Built by **Cüneyd Ayla**
