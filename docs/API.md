# CampusCompass REST API contract

Base path: `/api`. JSON requests use `Content-Type: application/json`. Browser requests include credentials. Unless stated otherwise, IDs are MongoDB ObjectIds.

## Auth

| Method and path | Access | Purpose |
| --- | --- | --- |
| `POST /auth/google` | public, rate-limited | Verify a Google ID token, upsert a user by `sub`, and create an HTTP-only session. |
| `GET /auth/me` | authenticated | Return the safe current-user profile and role. |
| `POST /auth/logout` | authenticated | Clear session cookie and invalidate server-side session/JTI if used. |

## Users, favorites, and reports

| Method and path | Access | Purpose |
| --- | --- | --- |
| `GET /users/me` | authenticated | Profile and account dashboard summary. |
| `PATCH /users/me` | authenticated | Update permitted profile preferences only. |
| `GET /users/me/reviews` | authenticated | Caller’s reviews, including their own moderation status but no private moderator notes. |
| `GET /favorites` | authenticated | Paginated favorites. |
| `POST /favorites/:institutionId` | authenticated | Save a published institution. |
| `DELETE /favorites/:institutionId` | authenticated | Remove caller’s favorite. |
| `POST /reports` | authenticated, rate-limited | Report an approved review; body supplies review ID, controlled reason, optional bounded detail. |
| `GET /reports/mine` | authenticated | Caller’s report history without confidential resolution detail. |

## Institutions

| Method and path | Access | Purpose |
| --- | --- | --- |
| `GET /institutions` | public | Published institutions. Supports `q`, `type`, `country`, `state`, `city`, `courses`, `facilities`, `minFee`, `maxFee`, `minRating`, `sort`, `page`, `limit`, and `view`. |
| `GET /institutions/featured` | public | Bounded published featured/recent/top-rated lists. |
| `GET /institutions/compare?ids=id,id,id` | public | Compare 2–3 published institutions. |
| `GET /institutions/:slug` | public | One published institution and public derived metrics. |
| `GET /institutions/:slug/reviews` | public | Approved reviews only; supports safe sort/page/limit. |

Allowed public sort values: `rating_desc`, `reviews_desc`, `newest`, `name_asc`. Filters combine with logical AND; multiple courses/facilities combine predictably and are documented in the endpoint response metadata.

## Reviews

| Method and path | Access | Purpose |
| --- | --- | --- |
| `POST /reviews` | authenticated, rate-limited | Create caller’s one pending review for a published institution. |
| `GET /reviews/:id` | owner or admin | Read a nonpublic review only when authorized. |
| `PATCH /reviews/:id` | owner or admin | Owner edits eligible review; edit transitions it to pending. Admin edit is separately audited. |
| `DELETE /reviews/:id` | owner or admin | Delete caller’s pending/rejected review or admin removal according to policy. |
| `POST /reviews/:id/attachments` | owner, rate-limited | Upload a bounded review attachment for moderation. |

Write bodies accept only `institutionId`, `overallRating`, allowed category ratings, `title`, `body`, optional normalized attendance period, and attachment references owned by the caller. Status, author, public totals, and moderation data are server-controlled.

## Administrator

All `/admin/*` endpoints require both an authenticated session and database role `admin`.

| Method and path | Purpose |
| --- | --- |
| `GET /admin/metrics` | Counts for institutions, users, pending/approved reviews, and open reports. |
| `GET /admin/reviews` | Moderation queue with bounded filters/search/pagination. |
| `GET /admin/reviews/:id` | Full moderation preview including allowed author context and pending media. |
| `POST /admin/reviews/:id/approve` | Approve and recompute public institution aggregates. |
| `POST /admin/reviews/:id/reject` | Reject; requires bounded reason/note. |
| `POST /admin/reviews/:id/flag` | Flag; requires bounded reason/note. |
| `GET /admin/institutions` | All institution statuses, paginated. |
| `POST /admin/institutions` | Create a draft institution. |
| `PATCH /admin/institutions/:id` | Edit validated institution data. |
| `POST /admin/institutions/:id/publish` | Publish only complete/valid institution data. |
| `POST /admin/institutions/:id/unpublish` | Remove it from public results. |
| `POST /admin/institutions/:id/archive` | Archive it without hard deletion. |
| `POST /admin/institutions/:id/media` | Upload/administer institution media. |
| `GET /admin/users` | Paginated user management view. |
| `PATCH /admin/users/:id/status` | Suspend/activate according to policy; cannot bypass last-admin safeguards. |
| `PATCH /admin/users/:id/role` | Role change with audit record and last-admin protection. |
| `GET /admin/reports` | Reported-review management queue. |
| `POST /admin/reports/:id/resolve` | Resolve/dismiss a report with audit reason. |
| `GET /admin/moderation-logs` | Paginated immutable audit records. |

## Health

`GET /health` is a minimal unauthenticated liveness/readiness endpoint. It must not expose secrets, database URLs, credentials, user data, or stack traces.

## Status conventions

- `200`: successful read/update/action.
- `201`: resource created.
- `204`: successful deletion with no body.
- `400`: malformed request or failed semantic validation.
- `401`: no valid session.
- `403`: valid session without permission.
- `404`: resource does not exist or is intentionally hidden.
- `409`: unique review/favorite/report or state-transition conflict.
- `413` / `415`: upload exceeds limit / file type disallowed.
- `429`: rate limited.
- `500`: unexpected error with a generic client message and server-side correlation/log context.
