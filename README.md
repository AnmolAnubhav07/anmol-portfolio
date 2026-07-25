# Anmol Anubhav — Portfolio

A Next.js + Tailwind + Framer Motion + Supabase portfolio.

## What's included

- Dark/light mode (persists across visits, follows system preference on first visit)
- Animated hero: gradient mesh background, floating particles, typing animation, mouse-parallax photo panel
- Scroll-reveal sections, glass-panel cards with gradient hover glow
- Skills, Projects, Gallery (Ken Burns slideshow), Experience, and a chronological Journey timeline
- Resume download + in-page preview modal
- Contact form → writes to a real Supabase table
- Live visitor counter (total / today / unique) → real Supabase table + RPC
- Scroll progress bar, cursor glow, page-load animation

**Not included yet:** the AI chat assistant from the original brief. It was
skipped for this pass since it needs an OpenAI API key — see
"Adding the AI chat assistant later" below for how to wire it in when you're
ready.

## 1. Install

```bash
npm install
```

## 2. Supabase — already set up

A dedicated Supabase project (`anmol-portfolio`, Mumbai region) has already
been created for you, with the schema from `supabase/migration.sql` applied:
- `visits` table + `record_visit()` function → powers the visitor counter
- `contact_messages` table → powers the contact form
- RLS policies so visitors can only insert, never read others' data

`.env.local` in this project already has the real URL and anon key filled
in, so you can skip straight to step 3. (`.env.local` is gitignored — when
you push to GitHub, add the same two variables in your Vercel project
settings, since Vercel won't see this local file.)

Project dashboard: https://supabase.com/dashboard/project/pdvofqotkohbdtsstezm

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 4. Edit your content

Everything text-based — name, bio, skills, projects, experience, timeline,
links — lives in one file: `src/lib/data.ts`. You generally shouldn't need
to touch component files just to update content.

To replace the hero photo placeholder, drop an image in `public/` and swap
the initials block in `src/components/Hero.tsx` (there's a comment marking
exactly where).

To add real gallery photos, drop images in `public/gallery/` and update the
`galleryPlaceholders` array in `data.ts`.

## 5. Deploy (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Initial portfolio"
gh repo create anmol-portfolio --public --source=. --push
vercel
```

(`gh` is the GitHub CLI, `vercel` is the Vercel CLI — both will prompt you
to log in the first time. If you're doing this from Claude Code, you can
just ask it to run these steps for you.)

Whichever way you deploy, add the same two environment variables
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your
hosting provider's dashboard — `.env.local` is only used locally and is
gitignored on purpose.

## Adding the AI chat assistant later

The brief asks for a RAG-based chatbot that answers questions about you
using Supabase embeddings + an LLM. To add it:

1. Get an OpenAI API key (or another provider's).
2. Enable the `pgvector` extension in Supabase and create a table of
   embedded chunks of your bio/projects/skills.
3. Write a Supabase Edge Function that: embeds the visitor's question,
   does a similarity search against that table, and calls the LLM with the
   retrieved context to answer.
4. Store the OpenAI key as a Supabase Edge Function secret (never in
   client-side code).
5. Build a `ChatWidget` component (floating icon + glass panel) that calls
   the edge function and streams the response back.

Happy to build all of this in a follow-up once you've got a key.
