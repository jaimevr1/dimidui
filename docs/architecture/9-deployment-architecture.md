# 9. Deployment Architecture
- **Strategy**: The project will be deployed as a static site on Vercel. The Vercel project will be connected to the GitHub repository.
- **CI/CD Pipeline**: Any push or merge to the `main` branch will automatically trigger a new deployment on Vercel. No complex build steps are needed.
- **Environments**:
    - **Production**: The live application, connected to the production Supabase project.
    - **Preview**: Vercel will automatically create preview deployments for each pull request, which can be connected to a separate staging Supabase project.
