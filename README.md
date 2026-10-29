# CampusCompass

CampusCompass is a full-stack school, college, and university discovery platform. It will let visitors search, filter, compare, and safely review institutions; reviews become public only after administrator approval.

> **Current milestone:** Phase 1 — architecture and implementation contract complete. The workspace was empty at project start; application packages have not been scaffolded yet.

## Planned stack

- **Client:** React, Vite, JavaScript, Tailwind CSS, React Router, React Hook Form + Zod, Axios, Lucide, React Hot Toast
- **Server:** Node.js, Express, Mongoose, Google Auth Library, JWT in HTTP-only cookies, Multer + Cloudinary
- **Data and validation:** MongoDB Atlas, Mongoose schemas/indexes, Zod request schemas
- **Quality:** Vitest + React Testing Library; Jest/Vitest + Supertest for API tests

## Run the frontend

The Phase 2 frontend is runnable with local sample data:

```bash
cd frontend
npm install
npm run dev
```

Use `npm run lint` and `npm run build` to validate it. The frontend is intentionally not connected to an API yet; sign-in, upload, review submission, administration, and sample records are visual/local interactions until Phases 3 and 4.

## Planned repository layout

```text
CampusCompass/
├── frontend/
│   ├── public/                  # robots.txt, sitemap, static fallback images
│   └── src/
│       ├── api/                 # Axios client and resource services
│       ├── components/          # shared UI, institution, review, upload components
│       ├── context/             # authenticated user and comparison state
│       ├── hooks/
│       ├── layouts/
│       ├── pages/               # public, account, admin and policy pages
│       ├── schemas/             # client-side Zod form schemas
│       ├── styles/
│       ├── test/
│       └── utils/
├── backend/
│   ├── src/
│   │   ├── config/              # env, database, Cloudinary and CORS setup
│   │   ├── controllers/
│   │   ├── middleware/          # auth, role, validation, errors, rate limits
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/            # Google verification, ratings, uploads, moderation
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── scripts/                 # development seed and controlled admin bootstrap
│   └── tests/
├── docs/
│   ├── ARCHITECTURE.md
│   └── API.md
├── PROJECT_STATUS.md
└── .env.example                 # added when each runnable package is scaffolded
```

## Development roadmap

The detailed architecture, data schema, API surface, security rules, and phase checklist live in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/API.md](docs/API.md). Progress is tracked in [PROJECT_STATUS.md](PROJECT_STATUS.md).

## External configuration required later

The application can be scaffolded and developed locally without external credentials. Before authentication, image upload, or deployed persistence can function, the project owner will need:

1. MongoDB Atlas connection string and an application database user.
2. A Google Cloud OAuth 2.0 Web Client ID, with local and production authorized JavaScript origins.
3. Cloudinary cloud name, API key, API secret, and an upload preset/folder policy.
4. Separate strong server secrets for session/JWT signing and CSRF protection.
5. A frontend origin, production API origin, and one explicitly authorized bootstrap-admin email address.

No keys, production URLs, or credentials are included in this repository.
