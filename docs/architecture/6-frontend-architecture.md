# 6. Frontend Architecture

## 6.1. Component Architecture
- **Component Organization**: A file-based module system will be used. Each core piece of functionality is encapsulated in its own JavaScript file within `/scripts/`. UI-centric modules responsible for rendering activities are in `/scripts/modules/`.
- **State Management**: State will be managed locally within each script. There is no global state management library. For session state (like the logged-in user), `localStorage` or `sessionStorage` will be used to store the student's ID and session token.

## 6.2. Routing Architecture
- **Routing**: Static file-based routing. Navigation between pages (`login.html`, `aluno-dashboard.html`, etc.) is handled by standard HTML links (`<a>` tags) or `window.location.href` assignments in JavaScript.
- **Protected Routes**: A check will be implemented at the beginning of each page's script (e.g., `dashboard.js`) to verify if a user session exists in `localStorage`. If not, the user will be redirected to `login.html`.

## 6.3. Frontend Services Layer
- **API Client**: A single Supabase client instance will be initialized in `/scripts/supabase-client.js` and exported for use across all other scripts. This ensures all database and auth interactions go through a single, consistent point.

---
