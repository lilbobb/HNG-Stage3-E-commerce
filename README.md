# Audiophile E-commerce Starter

Minimal starter implementing:
- Next.js (App Router)
- Tailwind CSS
- React Hook Form
- React Context for Cart
- Convex backend (schema + function stub)
- Resend email integration (server-side)

## Quick start

1. Install dependencies
```bash
npm install
```

2. Create `.env.local` with:
```
NEXT_PUBLIC_CONVEX_URL=your_convex_dev_or_deploy_url
RESEND_API_KEY=your_resend_api_key
```

3. Run Next.js
```bash
npm run dev
```

4. Run Convex locally (optional, if using Convex dev)
```bash
npx convex dev
```

## Notes
- This is a starter skeleton. Add your Convex deployment id and Resend API key in `.env.local`.
- The `src/lib/resend.ts` uses the `resend` package to send transactional emails.
- Edit the Figma-derived styles and components in `src/components` and `src/app` as needed.


## Convex codegen
After installing Convex locally, run `npx convex dev` and `npx convex codegen` to generate the Convex client in `convex/_generated`.
