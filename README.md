# Watchway Frontend

Watchway Frontend is a Next.js 16 application for a video-sharing platform. It provides video discovery, playback, channel pages, playlists, community posts, subscriptions, likes, and authenticated user actions.

## Core Features

- Authentication: Login, registration, logout, and current-user session hydration.
- Video experience: Homepage feed, video watch page, comments, and search.
- Creator tools: Video upload with status polling and channel cover image updates.
- Engagement: Like toggles (video, comment, post), subscriptions, and replies.
- Personalization: Watch history, liked videos, and playlist management.

## Tech Stack

- Framework: Next.js 16 (App Router) with React 19 and TypeScript.
- Styling: Tailwind CSS v4, shadcn/ui components, and Framer Motion.
- Data fetching: TanStack Query (React Query) for server-state caching and mutations.
- State management: Zustand for auth, app UI, and upload state.
- API client: Axios with cookie-based auth and refresh-token retry handling.
- Forms and validation: React Hook Form with Zod.

## Prerequisites

- Node.js 20 or later
- pnpm (recommended)
- Watchway backend API running and reachable

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CLOUDINARY_USERNAME=your_cloudinary_username
```

- `NEXT_PUBLIC_BASE_URL`: Base URL of the backend API.
- `NEXT_PUBLIC_CLOUDINARY_USERNAME`: Cloudinary username used by frontend upload/media flows.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open the app:

`http://localhost:3000`

## Available Scripts

- `pnpm dev`: Run the development server.
- `pnpm build`: Build for production.
- `pnpm start`: Start the production build.
- `pnpm lint`: Run ESLint.
- `pnpm format`: Format files with Prettier.
- `pnpm format:check`: Check formatting with Prettier.

## Main Routes

- `/`: Home feed
- `/watch/[videoId]`: Video player page
- `/search?q=...`: Search results
- `/channel/[id]`: Channel videos
- `/channel/[id]/playlists`: Channel playlists
- `/channel/[id]/community`: Channel community posts
- `/channel/[id]/subscriptions`: Channel subscriptions
- `/channel/[id]/about`: Channel about page
- `/collection` and `/collection/[id]`: Playlists and playlist detail
- `/subscriptions`: Subscribed channels
- `/liked-videos`: User liked videos
- `/history`: Watch history
- `/login` and `/register`: Authentication pages

## Project Structure

```text
app/         Next.js routes, layouts, and route-level components
components/  Reusable UI and feature components
services/    API service hooks (query/mutation logic)
config/      Routes, endpoints, and environment parsing
lib/         Shared utilities (API client, query client, hooks)
store/       Zustand stores
types/       Shared TypeScript types
utils/       Generic helper utilities
```

## API Integration Notes

- The app expects backend endpoints under `/api/v1`.
- Requests use `withCredentials: true` for cookie-based auth.
- On `401`, the client attempts token refresh via `/api/v1/users/refresh-token` and retries failed requests.

## Development Workflow

- Husky and lint-staged are configured to run lint/format checks on staged files.
- Use `pnpm lint` and `pnpm format:check` before pushing changes.
