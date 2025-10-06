# 8. Coding Standards
- **Supabase Client**: All interactions with Supabase MUST be done through the exported client from `/scripts/supabase-client.js`. Do not initialize new clients elsewhere.
- **Environment Variables**: Supabase URL and Anon Key must be stored in environment variables and not hardcoded. A `.env.example` file should be provided.
- **CSS**: All colors, fonts, and spacing values must be defined as CSS variables in `variables.css` and used throughout the application.
- **Error Handling**: All calls to Supabase must be wrapped in `try...catch` blocks to handle potential API or network errors gracefully.
- **Naming Conventions**:
    - JavaScript files: `kebab-case.js`
    - CSS classes: `kebab-case`
    - JS Functions: `camelCase()`

---
