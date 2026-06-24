# 🚀 SmartLink – Scalable URL Shortener

SmartLink is a full-stack URL Shortener application built using **React, Node.js, Express, Supabase, Redis, and Docker**.

The project demonstrates real-world backend concepts such as URL shortening, authentication, caching, containerization, and scalable application architecture.

---

# ✨ Features

* 🔗 Generate short URLs from long URLs
* 👤 User Authentication (Sign Up / Sign In)
* 🔒 Secure session management
* 📊 Click count tracking
* ⚡ Redis caching support (Cache-Aside Pattern)
* 🗄️ Supabase PostgreSQL database
* 🎨 Responsive React UI
* 🐳 Dockerized Backend & Frontend
* 🚀 Docker Compose support

---

# 🏗️ System Architecture

```text
                Browser
                    │
                    ▼
           React Frontend
                    │
             HTTP Requests
                    │
                    ▼
        Node.js + Express API
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
   Redis Cache          Supabase Database
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Bootstrap
* Axios

## Backend

* Node.js
* Express.js

## Database

* Supabase PostgreSQL

## Cache

* Redis (Optional)

## DevOps

* Docker
* Docker Compose

---

# 📁 Project Structure

```text
URL_Shortner/

│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── client/
│   └── url-shortener/
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── src/
│       └── package.json
│
├── docker-compose.yml
│
└── README.md
```

---

# 🐳 Docker Setup

## Prerequisites

Install:

* Docker Desktop
* Git

---

## Clone Repository

```bash
git clone https://github.com/sutharsangit/URL_Shortner.git

cd URL_Shortner
```

---

## Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key

REDIS_HOST=your_redis_host

REDIS_PORT=6379

REDIS_PASSWORD=your_password

PORT=5000
```

---

## Build & Run

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

---

## Stop Containers

```bash
docker compose down
```

---

# 🌐 Application URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

---

# 🐳 Docker Commands

Build Images

```bash
docker compose build
```

Start Containers

```bash
docker compose up
```

Start in Detached Mode

```bash
docker compose up -d
```

View Running Containers

```bash
docker ps
```

View Logs

```bash
docker compose logs
```

Stop Containers

```bash
docker compose down
```

---

# 🔄 Development Workflow

```text
Clone Repository
        │
        ▼
Create backend/.env
        │
        ▼
docker compose up --build
        │
        ▼
Frontend + Backend Running
```

---

# 📌 Future Improvements

* Redis Docker Container
* Docker Volumes
* Production Docker Images
* Nginx Reverse Proxy
* Kubernetes Deployment
* CI/CD Pipeline using GitHub Actions

---

# 👨‍💻 Author

**S. Sutharsan**

GitHub:
https://github.com/sutharsangit

---

# ⭐ If you found this project useful

Give the repository a ⭐ on GitHub.
