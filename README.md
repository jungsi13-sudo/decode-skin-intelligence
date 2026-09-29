# decode.skin Intelligence & Learning Wiki

## 서비스 소개

decode.skin Intelligence & Learning Wiki는 피부 시술 정보와 서비스 개발 과정에서 학습한 기술을 정리한 지식형 웹 서비스입니다.

- **Treatment Intelligence Wiki**: Supabase에 저장된 피부 시술 정보를 구조적으로 제공합니다.
- **Founder Learning Wiki**: Next.js, React, Supabase, GitHub, Vercel 등 실제 개발 과정에서 학습한 내용을 질문 중심으로 제공합니다.

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

## 실행 방법

먼저 저장소를 클론하고 프로젝트 폴더로 이동합니다.

```bash
git clone https://github.com/jungsi13-sudo/decode-skin-intelligence.git
cd decode-skin-intelligence
pnpm install
pnpm dev

Then open `http://localhost:3000`.

## Supabase environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
```

Without these variables, RF Skin Tightening uses demo content so the UI can still be reviewed.

## Main routes

- `/learning/start-here`
- `/learning/tailwind-css`
- `/learning/shadcn-ui`
- `/learning/git-github-codex`
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
- 21 question-driven chapters based on the actual decode.skin build/learning path
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
3. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as Vercel environment variables.
4. Configure safe read access/RLS for the internal viewer.
5. Confirm: NocoDB edit → Supabase row changes → Viewer refresh shows the change.
6. Add login before storing or exposing sensitive internal/customer data.
