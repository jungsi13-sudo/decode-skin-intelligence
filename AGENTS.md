# decode.skin Intelligence Wiki — Agent Guide

## Scope and product role

This repository is the **internal** Next.js + React viewer for decode.skin's Treatment Intelligence Wiki and Learning Wiki. Treat the repository as the code source of truth; do not use it as a substitute for the content database.

## System of record

- **Supabase** is the master database, backend, and source of truth.
- **NocoDB** is the day-to-day content and data admin surface.
- **Next.js + React** is the internal wiki frontend/viewer.
- **GitHub** is the code source of truth.
- **Vercel** is deployment and hosting.
- **Directus** is optional/standby only; do not make it a required runtime without an explicit decision.

## Content and privacy rules

- Long-term content belongs in Supabase. Do not hardcode new or changed operational content in the frontend.
- The intended operational flow is: **NocoDB → Supabase → Next.js Viewer**.
- Keep internal content and public content separate by data model, access control, and UI route. Never assume an internal viewer is safe to expose publicly.
- Founder Take and other internal-only material must never be included in public content, public APIs, static exports, or client-side data bundles.
- The current demo/static content exists for prototype fallback behavior. Do not expand it; move content to Supabase as part of an explicitly approved data-migration task.

## How Codex should work here

- Use Codex for system changes: functionality, layout, authentication, data connections, testing, and deployment configuration.
- Use NocoDB for routine content edits, not code changes.
- Before changing auth, data access, visibility, or routes, identify whether the target is internal or public and preserve the separation above.
- Keep changes small and verify them with the relevant checks. Do not modify secrets or commit credentials.

## Current implementation boundaries

The following are planned, but **must not be implemented unless explicitly requested**:

1. Internal Wiki authentication.
2. Treatment Wiki backed by real Supabase data.
3. Learning Wiki backed by database-driven content.
4. An end-to-end NocoDB input → Supabase → Wiki output test.

See [`docs/architecture.md`](docs/architecture.md) for the operating model and roadmap.
