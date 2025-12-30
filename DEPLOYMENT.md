# Deployment Guide for CareerLift

This guide covers deploying the CareerLift application.

## Option 1: Vercel (Recommended)
Since this is a Next.js application, Vercel provides the smoothest deployment experience.

1.  **Push to GitHub**: Ensure your code is in a remote repository.
2.  **Import to Vercel**:
    *   Go to Vercel Dashboard -> Add New -> Project.
    *   Connect your GitHub repository.
3.  **Configure Environment Variables**:
    *   Add the following variables in the "Environment Variables" section:
    
    | Variable | Description |
    | :--- | :--- |
    | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
    | `OPENROUTER_API_KEY` | Key for OpenRouter (or Gemini/Groq) |
    | `GROQ_API_KEY` | (Optional) If using Groq fallback |
    | `GEMINI_API_KEY` | (Optional) If using Gemini fallback |

4.  **Deploy**: Click "Deploy". Vercel will automatically detect `npm run build`.

## Option 2: Render (Web Service)
If you prefer Render for the backend/frontend logic:

1.  **Create Web Service**:
    *   Connect GitHub repo.
    *   Runtime: **Docker**.
    *   Render will automatically detect the `Dockerfile` in the root.
2.  **Environment Variables**:
    *   Add the same variables as listed above in the Render dashboard.
3.  **Start Command**: Not needed (Dockerfile handles it).
4.  **Plan**: Ensure you select a plan with at least 512MB RAM for the Next.js build process.

## Option 3: "Split" Deployment (Frontend Vercel / Backend Render)
*Note: This project is currently a monolithic Next.js app using Server Actions. Splitting strictly "Frontend" and "Backend" is not necessary unless you have a separate API service.*

If you *must* run logic on Render:
1.  Deploy the entire app to **Render** using Option 2.
2.  Deploy the entire app to **Vercel** using Option 1.
3.  (Advanced) You could configure `next.config.ts` rewrites to point specific API routes to the Render instance, but this is complex and usually unnecessary for this architecture.

**Recommended Strategy**: Deploy the full stack to Vercel for the demo. it's faster, free for hobby usage, and supports Server Actions natively.

## Post-Deployment Checks
*   **Auth**: Verify Login/Signup works on the production URL (Update Supabase "Site URL" in Auth Settings).
*   **AI**: Test the "Enhance Resume" feature to ensure API keys are environment-variable accessible.
*   **PDF**: Test the PDF download (Proxy to LatexOnline).
