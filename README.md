# 🚀 SmartLink – Scalable URL Shortener

SmartLink is a **full-stack URL shortening platform** built to explore **System Design concepts, scalable backend architecture, caching strategies, and secure authentication**.

This project focuses on how real-world systems improve **response time, scalability, and user experience** using **Redis caching and Supabase cloud services**.

---

## 📌 Features

- 🔗 Generate short URLs from long links
- ⚡ Redis Cloud caching for faster repeated access
- 🗄️ Supabase PostgreSQL persistent storage
- 🔐 Secure user authentication (Sign Up / Sign In)
- 👁️ Password toggle (show / hide)
- 📊 Click count tracking
- 🚪 Session-based login & logout
- 🎨 Clean professional React dashboard UI

---

## 🏗️ System Architecture

```text
React Frontend
      ↓
Node.js + Express Backend
      ↓
Redis Cache (Cache-Aside Pattern)
      ↓
Supabase Database
