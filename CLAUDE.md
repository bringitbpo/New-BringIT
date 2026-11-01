# BringIT website — www.bringitbpo.com

Marketing site for BringIT, a remote operations and revenue control service for U.S. restaurant franchise owners (1–10 locations). Run from Dhaka by Fahad (founder). Positioning: premium remote operations partner, not a virtual assistant service.

## Stack & deploy
- React 19 + TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`), Motion (Framer Motion), shadcn/Radix UI, lucide-react icons
- Firebase Auth (Google sign-in), project `bringit-25`, config in `src/App.tsx`
- Contact form posts to Formspree (`formspree.io/f/mgorgakb`) in `src/App.tsx`
- Hosted on Vercel; every push to `main` auto-deploys to production. Domain is on Namecheap.
- Originally scaffolded in Google AI Studio (README and `.env.example` still reference Gemini; the site does not need a Gemini key to run).

## Layout
- `src/App.tsx` — almost the whole site: nav, hero, `#services`, `#about`, `#contact`, footer, auth
- `src/components/ui/squishy-pricing.tsx` — package cards (no prices shown; buttons open WhatsApp)
- `src/components/FaqItem.tsx`, `src/components/ContactForm.tsx` — FAQ accordion item, Formspree contact form
- `src/lib/contact.ts` — WhatsApp / US phone / email constants used across the site
- `src/components/ui/container-scroll-animation.tsx` — scroll animation
- `src/public/LOGO_1_1_no_BG.png`, `public/LOGO_1_1_no_BG.png` — logo

## Commands
- `npm install`
- `npm run dev` — local dev on port 3000
- `npm run build` — must pass before pushing (a failed build breaks the Vercel deploy)
- `npm run lint` — type check (`tsc --noEmit`)

## Business facts (keep copy consistent)
- Pricing: not shown on the site. Packages (Starter, Growth, Premium) and add-ons are listed without prices; visitors are sent to WhatsApp for pricing
- Services: review management, platform monitoring (DoorDash, UberEats, GrubHub, OLO), complaint/dispute handling, staff accountability, owner reporting, social media, scheduling, bill tracking, procurement coordination, multi-store reporting
- Founder background: 5+ years managing U.S. franchise brands remotely (Dunkin', Cold Stone Creamery, Baskin Robbins, Charleys Cheesesteaks, Domino's, Papa John's)
- Contact: bringit.bpo@gmail.com · US +1 516-341-1071 · WhatsApp +880 1351-656330
- Branding: dark matte background with orange accent

## Working with Fahad
- Brief, step-by-step explanations; direct delivery without extra commentary
- Natural U.S. English in all site copy (audience is U.S. restaurant owners)
- Prefer new components in new files over large edits to existing ones
- Changes must be easy to undo: small focused commits, run `npm run build` before pushing, and say which commit to revert if needed
- Ask before changing pricing, contact details, or the Formspree/Firebase setup
