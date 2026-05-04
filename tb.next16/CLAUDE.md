# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (output: standalone for Docker)
npm run start     # Run production server
npm run lint      # ESLint
npm run test      # Jest (all tests)
npx jest src/path/to/file.test.tsx   # Run a single test file
npx jest --coverage                  # Run tests with coverage report
```

## Architecture Overview

Next.js 16 App Router project with MUI Material 7, Redux Toolkit, and Azure MSAL authentication.

### Route Structure

- `src/app/(public)/` — unauthenticated routes (e.g., `/unauthorized`)
- `src/app/(private)/` — authenticated routes protected by auth layout

### Provider Chain

The root layout wraps the app in `EnvProvider` (server component that injects `SESSION_SECRET`). Inside `(private)/layout.tsx`, the client-side provider chain is:

```
RootProvider → StoreProvider (Redux) → ThemeProvider (MUI) → AuthProvider (MSAL)
```

`root-provider.tsx` includes a hydration guard to prevent SSR/CSR mismatches.

### State Management

Redux Toolkit store at `src/redux/store.ts` with slices:
- `dialogSlice` — global dialog open/close state
- `loaderSlice` — global loading indicator
- `navbarSlice` — sidebar/navbar state
- `userAuthSlice` — authenticated user info

Store state is persisted to `sessionStorage` via the custom serializer in `src/redux/sessionStorage.ts`.

### API Layer

Two Axios instances in `src/libs/axios.ts`:
- `axiosInstance` — client-side requests, base URL from `NEXT_PUBLIC_API_URL`
- `axiosServerInstance` — server-side requests (bypasses SSL in dev)

Higher-level wrappers: `src/libs/apiService.ts` (client), `src/libs/nextApi.ts` (server actions), `src/libs/server-action.ts`.

### Authentication

Azure MSAL configured in `src/msalConfig.ts`. Environment variables required:
```
NEXT_PUBLIC_CLIENT_ID_FOR_WACC
NEXT_PUBLIC_AUTHORITY_FOR_WACC
NEXT_PUBLIC_REDIRECT_URI_FOR_WACC
NEXT_PUBLIC_RESOURCE_ID
SESSION_SECRET
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SITE_URL
```

Token caching uses `localStorage`. Auth scopes: `tni.dataservice.Write`, `tni.dataservice.Read`.

### Styling

- **MUI** primary color: `#F37021` (orange). Custom theme in `src/styled/theme.tsx`; extended type declarations in `src/theme.d.ts`
- **Tailwind CSS 4** via PostCSS — utility classes only, not component styling
- **Emotion** for MUI's CSS-in-JS

### Testing Conventions

Tests live next to their source files (`*.test.tsx`). The Jest setup mocks MUI icons as SVG stubs. Use `src/utils/renderWithProvider.tsx` to render components inside the Redux + Theme provider tree in tests. MSAL is mocked via `src/utils/msalMock.tsx`.

### Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json` and `jest.config.ts`).

### Deployment

`next.config.ts` sets `output: "standalone"`. The `Dockerfile` uses Node 22 Alpine with a multi-stage build and runs as a non-root `nextjs` user on port 3000.
