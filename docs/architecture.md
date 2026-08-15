# Architecture and operating model

## Purpose

`decode-skin-intelligence` is an internal Next.js viewer for two connected knowledge experiences:

- **Treatment Intelligence Wiki**: structured treatment information read from Supabase when configured, with prototype demo fallback.
- **Learning Wiki**: founder-oriented technical documentation of the decode.skin system.

The frontend is a viewer, not the content-management system or the master data store.

## Authoritative systems

| Responsibility | System |
| --- | --- |
| Master database, backend, source of truth | Supabase |
| Routine content/data administration | NocoDB |
| Internal wiki frontend/viewer | Next.js + React |
| Code and change history | GitHub |
| Deployment and hosting | Vercel |
| Optional/standby CMS/admin | Directus |

## Intended content flow

```text
NocoDB
  → routine content/data input and edits
Supabase
  → master data and backend source of truth
Next.js + React
  → internal Wiki viewer
Vercel
  → deployment and hosting
```

Code follows a distinct path:

```text
Codex or developer changes
  → GitHub (code source of truth)
  → Vercel deployment
```

## Content and access boundaries

- Content is managed in Supabase in the long term; the frontend must not become the source of truth through hardcoded operational content.
- Internal and public content are separate products and must remain separate in schema, authorization, API exposure, and frontend routes.
- Founder Take and all internal-only intelligence must not be published or made available to public clients.
- Routine edits belong in NocoDB. Codex is used for system-level work such as functionality, layout, authentication, data integrations, and tests.

## Internal Wiki authentication

The Internal Wiki uses Supabase Auth email/password and Google OAuth sign-in with cookie-based SSR sessions. `proxy.ts` redirects unauthenticated requests before the internal routes run, while the internal route-group layout verifies claims again before it renders any Wiki content. Google OAuth returns through `/auth/callback`, where its PKCE code is exchanged for the session before the user returns to the requested internal route. This prevents Founder Take and other internal material from being rendered for unauthenticated requests.

Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are used. These values identify the Supabase project and are safe for the browser when database Row Level Security (RLS) is configured correctly. No service-role or other secret key is used by the frontend.

## Current repository structure

```text
app/                 App Router routes and root layout
  learning/          Learning Wiki routes
  treatments/        Treatment Wiki route
components/          Sidebar, architecture map, Markdown renderer
lib/                 Supabase REST reader, types, prototype fallback content
docs/                Project operating documentation
AGENTS.md            Instructions for Codex and other coding agents
```

The Treatment Wiki reader in `lib/supabase-rest.ts` is prepared to read `treatments`, `treatment_content`, `treatment_methods`, and `modalities`. It falls back to prototype data when Supabase configuration or reads fail. The Learning Wiki is currently static prototype content in `lib/learning-wiki.ts`.

## Remaining planned implementation — do not implement without explicit approval

1. Connect Treatment Wiki to real Supabase data.
2. Move Learning Wiki content to a DB-driven model.
3. Test the full NocoDB input → Supabase → Wiki output path.

These items require explicit implementation work, including an authorization/data-access design before any internal content is exposed.
