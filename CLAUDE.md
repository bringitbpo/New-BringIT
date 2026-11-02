# BringIT website — www.bringitbpo.com

Marketing site for BringIT, a remote operations and revenue control service for U.S. restaurant franchise owners (1–10 locations). Run from Dhaka by Fahad (founder). Positioning: premium remote operations partner, not a virtual assistant service.

## Stack & deploy
- React 19 + TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`), Motion (Framer Motion), shadcn/Radix UI, lucide-react icons
- Firebase package is still installed (project `bringit-25`), but the site no longer shows Google sign-in
- Contact form and call bookings post to Formspree (`formspree.io/f/mgorgakb`), see `src/components/ContactForm.tsx`; after booking, the visitor can send the details to WhatsApp
- Hosted on Vercel; every push to `main` auto-deploys to production. Domain is on Namecheap.
- Originally scaffolded in Google AI Studio (README and `.env.example` still reference Gemini; the site does not need a Gemini key to run).

## Layout
- `src/App.tsx` — puts the page sections together; `/#/privacy` shows the Privacy Policy
- `src/content/site.ts` — ALL site copy and numbers (edit text here)
- `src/components/site/` — one file per section (Nav, Hero, OpsTablet, Services, Disputes, HowWeWork, About, Security, Packages, Faq, Contact, BookingModal, PrivacyPolicy, Expandable)
- `src/site.css` — styles for the light "Executive" design (color variables are prefixed `--b-` to avoid clashing with `src/index.css`)
- `src/components/ContactForm.tsx` — Formspree contact form (also exports `FORMSPREE_URL`, used by the booking calendar)
- `src/lib/contact.ts` — WhatsApp / US phone / email constants
- `public/LOGO_1_1_no_BG.png` — logo

## Commands
- `npm install`
- `npm run dev` — local dev on port 3000
- `npm run build` — must pass before pushing (a failed build breaks the Vercel deploy)
- `npm run lint` — type check (`tsc --noEmit`)

## Business facts (keep copy consistent)
- Pricing: not shown on the site. Packages (Starter, Growth, Premium) and add-ons are listed without prices; visitors are sent to WhatsApp for pricing
- Services: review management, platform monitoring (DoorDash, UberEats, GrubHub, OLO), complaint/dispute handling, staff accountability, owner reporting, social media, scheduling, bill tracking, procurement coordination, multi-store reporting
- Founder background: 5+ years managing U.S. franchise brands remotely (Dunkin', Cold Stone Creamery, Baskin Robbins, Charleys Cheesesteaks, Wetzel's Pretzels)
- Contact: bringit.bpo@gmail.com · US +1 516-341-1071 · WhatsApp +880 1351-656330
- Branding: light, professional design (white/grey, navy buttons, orange accent)
- Team: remote team working U.S. hours; departments are Operations, Marketing and Finance. Don't mention Dhaka, team size or founding year
- Fahad is "Founder & CEO". Never attribute tasks to him by name or as "the owner"; say "our CEO"
- Contracts are month to month, no free trial. NDA on request; client data deleted when the contract ends
- Results figures in `src/content/site.ts` are placeholders until Fahad provides real numbers

## Working with Fahad
- Brief, step-by-step explanations; direct delivery without extra commentary
- Natural U.S. English in all site copy (audience is U.S. restaurant owners)
- Prefer new components in new files over large edits to existing ones
- Changes must be easy to undo: small focused commits, run `npm run build` before pushing, and say which commit to revert if needed
- Ask before changing pricing, contact details, or the Formspree/Firebase setup
