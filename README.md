# TECHRODEO event portal

A Next.js App Router portal for the TECHRODEO multi-college event. The interface uses Tailwind CSS and shadcn components. Next.js Route Handlers provide the backend, and MongoDB stores event and participant data.

## Start locally

1. Install Node.js 20.9 or newer and MongoDB Community Server, or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env.local`.
3. Set `MONGODB_URI` and `MONGODB_DB`.
4. Run `npm install`.
5. Run `npm run dev` and open http://localhost:3000.

## Participant accounts

- Registration: `POST /api/auth/register` — accepts name, college, and password. The server generates a username and returns it after signup.
- Sign in: `POST /api/auth/login` — accepts generated username and password.
- Sign out: `POST /api/auth/logout`.
- Current session: `GET /api/auth/me`.

Passwords are stored using Node.js scrypt. Sessions use random tokens stored as hashes in MongoDB and an HTTP-only cookie. Users have a `student` role by default; public registration cannot create organiser accounts. Save the generated username after registration because it is needed for future sign-ins.

Set `NEXT_PUBLIC_ORGANISER_EMAIL` to the organiser's contact email if you want the public contact link to open an email draft. This value is public by design; never put passwords or secrets in a `NEXT_PUBLIC_*` variable.

## Events API

The public events endpoint reads published documents from the `events` collection at `GET /api/events`. Documents need at least `name` and `status: "PUBLISHED"` fields. Event writes remain disabled until authenticated Super Admin authorization is implemented.

## Current limitations

- The dashboard remains a UI prototype with sample metrics and registrations.
- Email verification, organiser account provisioning and authorisation, event/team registration workflows, exports, and production rate limiting are not implemented yet.
- Department team limits, participant identity, event capacity, and cancellation authority still need decisions before event registration rules can be enforced.
- Do not use this as a production registration system until the remaining controls are implemented and tested.

## Visual direction

The portal uses an original DOOM-inspired charcoal, ember, and hazard palette. A decorative Tabler skull SVG loads from Iconify's public SVG API. Sound effects are synthesized with the Web Audio API and start muted.
