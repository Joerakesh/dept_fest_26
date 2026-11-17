# TECHRODEO event portal

A Next.js App Router starter for the TECHRODEO multi-college event portal. The interface uses Tailwind CSS and reusable shadcn-style components. Next.js Route Handlers provide the backend, and MongoDB stores event data.

## Start locally

1. Install Node.js 20.9 or newer and MongoDB Community Server, or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env.local`.
3. Set `MONGODB_URI` to your local MongoDB URI or Atlas connection string. Set `MONGODB_DB` to the database name.
4. Run `npm install`.
5. Run `npm run dev` and open http://localhost:3000.

The public events endpoint reads published documents from the `events` collection at `GET /api/events`. Documents need at least `name` and `status: "PUBLISHED"` fields. Event writes remain disabled until authenticated Super Admin authorization is implemented.

## Current state

- The dashboard is a UI prototype with sample metrics and registrations.
- MongoDB access is pooled across development hot reloads in `lib/db.ts`.
- The project has not implemented login, email verification, registration submission, exports, or authorization flows; do not deploy it as a production registration system.
- Department team limits, participant identity, event capacity, and cancellation authority still need decisions before registration rules can be enforced.

## Visual direction

The dashboard takes inspiration from Aaruush’s cinematic hero and clear section hierarchy, with an original DOOM-inspired charcoal, ember, and hazard palette. A decorative Tabler skull SVG loads from Iconify’s public SVG API. Sound effects are synthesized with the Web Audio API and start muted.
