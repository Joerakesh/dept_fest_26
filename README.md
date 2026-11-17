# TECHRODEO event portal

A Next.js App Router event portal using Next.js Route Handlers as its backend and MongoDB for persisted event and portal data. The public landing page, Super Admin area, college workspace, and coordinator area use separate route groups and navigation.

## Start locally

1. Install Node.js 20.9 or newer and MongoDB Community Server, or configure MongoDB Atlas.
2. Copy `.env.example` to `.env.local` and set `MONGODB_URI` and `MONGODB_DB`.
3. Run `npm install`, then `npm run dev`.
4. Visit http://localhost:3000.

## Route areas

- `(public)`: public landing, event catalogue, schedule, FAQ, and participation callout.
- `(superadmin)/admin`: platform dashboard, event management, and database-backed management pages.
- `(organiser)/organiser`: college-scoped dashboard and workspace pages.
- `(coordinator)/coordinator`: dashboard and assigned-event pages.
- `/dashboard`: redirects a signed-in user to the dashboard for an assigned role.

Layouts enforce role access on the server. Super Admin is stored on the user account. College Admin and Organiser access comes from `college_memberships`; Coordinator access comes from `event_coordinator_assignments`. College and event queries are scoped to those memberships or assignments. The dashboard and public catalogue read MongoDB records and show empty states when no records exist; there are no sample dashboard or event fixtures.

## Authentication and initial Super Admin

College signup at `/register` creates a college workspace and its first College Admin. Login accepts the generated username or institution email. Sessions use random tokens stored as hashes in MongoDB and an HTTP-only cookie; passwords are hashed with Node.js scrypt.

To create the first Super Admin, set a long random `SUPERADMIN_BOOTSTRAP_SECRET` in `.env.local`, then make a one-time `POST /api/auth/bootstrap-superadmin` request with that value in the `x-bootstrap-secret` header and JSON fields `name`, `username`, `email`, and `password` (minimum 12 characters). Bootstrap closes once a Super Admin exists. Remove the secret from the environment after provisioning.

## Dynamic data

- `events`: public pages read only records with `status: "PUBLISHED"`. Super Admins can create event records from `/admin/events` or `POST /api/events`.
- `faqs`: public FAQ reads published records containing `question`, `answer`, and optional `order`.
- `registrations`: dashboard counts and recent rows come from MongoDB.
- `college_memberships`, `event_coordinator_assignments`, `registration_settings`, and `audit_logs`: role and operations records follow the multi-college plan.

## Current implementation boundary

The role areas, route guards, dynamic dashboards, public event/FAQ/schedule data, first College Admin signup, and Super Admin event creation are implemented. Email verification and invitation delivery need an email provider. Team registration, editing, participant-limit/schedule validation, coordinator assignment UI, exports, account administration, and registration controls are not implemented yet. The four registration-policy choices from the architecture note (department uniqueness scope, participant identity key, event capacity, and cancellation authority) remain configurable product decisions before the registration engine is built.

Do not use this yet as a production registration system; the team registration lifecycle and remaining security controls still need implementation and verification.

## Visual direction

The portal uses an original DOOM-inspired charcoal, ember, and hazard palette. Event facts are sourced from MongoDB. The background track and UI sound effects start only after the visitor uses the sound control, because browsers block sound before a user gesture.

$secret = Read-Host "Bootstrap secret"
$securePassword = Read-Host "Initial Super Admin password" -AsSecureString
$password = [System.Net.NetworkCredential]::new("", $securePassword).Password

$body = @{
name = "Joe Rakesh"
username = "joerakesh"
email = "rakeshjoe52@gmail.com"
password = $password
} | ConvertTo-Json

Invoke-RestMethod `  -Uri "http://localhost:3000/api/auth/bootstrap-superadmin"`
-Method Post `  -Headers @{ "x-bootstrap-secret" = $secret }`
-ContentType "application/json" `
-Body $body

Remove-Variable secret, securePassword, password, body

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/bootstrap-superadmin" -Method Post -Headers @{ "x-bootstrap-secret" = $secret } -ContentType "application/json" -Body $body
