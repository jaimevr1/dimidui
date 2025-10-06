# 2. High-Level Architecture

## 2.1. Technical Summary
This project uses a modern Jamstack architecture. The frontend is a static site built with **HTML, CSS, and Vanilla JavaScript**, deployed on **Vercel**. The backend is entirely managed by **Supabase**, which provides the PostgreSQL database, authentication, and instant REST APIs. This BaaS (Backend-as-a-Service) approach minimizes backend development overhead, allowing the team to focus on frontend features and user experience, directly aligning with the goal of rapid MVP delivery in 5 weeks.

## 2.2. Platform and Infrastructure Choice
- **Platform:** Vercel + Supabase
- **Key Services:**
    - **Vercel:** Hosting for the static frontend, CI/CD, Global CDN.
    - **Supabase:** PostgreSQL Database, User Authentication (Supabase Auth), Auto-generated REST API (PostgREST), Row Level Security (RLS).
- **Deployment Host and Regions:** Vercel (Global Edge Network), Supabase (AWS region to be chosen, e.g., `us-east-1`).

## 2.3. Repository Structure
- **Structure:** Monorepo
- **Rationale:** Given the simplicity of the stack (no separate backend build process), a single repository is sufficient to house all frontend code and documentation, simplifying project management.

## 2.4. High-Level Architecture Diagram
```mermaid
graph TD
    User[Alunos & Professores] -->|HTTPS| Vercel[Vercel Edge Network]
    Vercel --> FE[Frontend Statico (HTML/JS/CSS)]
    FE -->|API Calls via supabase-js| Supabase[Supabase API Gateway]
    Supabase --> Auth[Supabase Auth]
    Supabase --> DB[(Supabase PostgreSQL DB)]

    subgraph "Supabase (Backend-as-a-Service)"
        Auth
        DB
    end
```

## 2.5. Architectural Patterns
- **Jamstack:** The frontend is a pre-built static site, interacting with backend services via APIs. This provides excellent performance, security, and scalability.
- **Backend-as-a-Service (BaaS):** Supabase abstracts the entire backend, allowing the frontend to interact directly with authentication and database services through a client library.
- **Component-Based UI (File-based):** Although not using a framework like React, the frontend logic is organized into modular JavaScript files (`/scripts/modules/*.js`), each responsible for a specific piece of UI or functionality.

---
