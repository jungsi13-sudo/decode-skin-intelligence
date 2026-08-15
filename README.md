# decode.skin Intelligence & Learning Wiki

Internal Next.js prototype for two connected knowledge experiences:

1. **Treatment Intelligence Wiki** — renders structured treatment data from Supabase (`treatments`, `treatment_content`, `treatment_methods`, `modalities`).
2. **Founder Learning Wiki** — question-driven documentation of the actual learning path that led to the current architecture, including Supabase, Directus, NocoDB, Docker, Render, HTML/CSS/JS, React, Next.js, VS Code, Codex, Git/GitHub, Vercel, WordPress, Notion, Figma, v0, Gamma and related concepts.

## Why the Learning Wiki is structured around questions

It does not only store definitions. Each chapter records:

- the question that triggered the topic,
- why that question came up in the real decode.skin build,
- what was confusing,
- the simple answer,
- how it actually works,
- what to remember,
- when it matters later.

## Current stack represented in the wiki

- Supabase = Master PostgreSQL / backend
- NocoDB = current preferred day-to-day data admin
- Directus = secondary CMS/admin experiment
- Next.js + React = internal viewer / future frontend learning path
- GitHub = code repository
- Vercel = intended Next.js deployment
- Render = Directus hosting
- Docker = Directus runtime packaging
- Notion = architecture/policy source of truth

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Supabase environment variables

Copy `.env.example` to `.env.local` and fill in the browser-safe project credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Without these variables, the Internal Wiki stays protected and the login page shows a configuration error. A service-role or other secret key is never used by this frontend.

## Main routes

- `/learning/start-here`
- `/learning/all-tools-map`
- `/treatments/rf-skin-tightening`


## Implemented in v0.2

### Treatment Intelligence Wiki
- Dynamic route: `/treatments/[slug]`
- RF Skin Tightening demo content included
- Other seeded treatments render as empty templates until Supabase content exists
- Supabase REST reader prepared for:
  - `treatments`
  - `treatment_content`
  - `treatment_methods`
  - `modalities`
- NocoDB remains the editing/admin surface; this frontend is read-only

### Founder Learning Wiki
- Dynamic route: `/learning/[slug]`
- 19 question-driven chapters based on the actual decode.skin build/learning path
- Each page contains:
  - original questions
  - why the question came up
  - what was confusing
  - simple answer
  - detailed explanation
  - decode.skin-specific application
  - what to remember
  - when it matters later
- Start Here page includes the top-level architecture map
- Tool Map covers PostgreSQL, Supabase, NocoDB, Directus, WordPress, Notion, HTML/CSS/JavaScript, React, Next.js, VS Code, Codex, Git/GitHub, Node.js/npm, Vercel, Render, Docker, Figma, v0, Gamma, ChatGPT and related concepts

## Next implementation milestone

1. Put this repository on GitHub.
2. Import it into Vercel and deploy the demo version.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as Vercel environment variables.
4. Configure safe read access/RLS for the internal viewer.
5. Confirm: NocoDB edit → Supabase row changes → Viewer refresh shows the change.
6. Configure Supabase Auth email/password users and the Vercel environment variables before deploying the Internal Wiki.
