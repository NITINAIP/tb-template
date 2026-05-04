# 01 — Project Structure & Module Pattern

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx                    ← Root layout (Server Component)
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx                     ← 'use client' required
│   ├── not-found.tsx
│   ├── (auth)/                       ← Route group (no URL segment)
│   │   ├── login/page.tsx
│   │   └── oauth/callback/page.tsx
│   ├── (dashboard)/                  ← Protected routes
│   │   ├── layout.tsx                ← Auth guard lives here
│   │   └── [module]/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   └── api/                          ← BFF layer only
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── refresh/route.ts
│       └── [resource]/route.ts
│
├── modules/                          ← 1 folder per page
│   └── [FeatureName]/
│       ├── components/
│       ├── [FeatureName]Module.tsx
│       ├── [FeatureName]Module.style.ts
│       ├── [FeatureName]Module.data.ts
│       └── [FeatureName]Module.store.ts
│
├── components/
│   ├── ui/                           ← Atomic components
│   ├── form/                         ← RHF + MUI compositions
│   └── layout/                       ← Sidebar, Navbar
│
├── lib/
│   ├── axios/
│   │   ├── axiosClient.ts            ← Client → /api/*
│   │   ├── axiosServer.ts            ← Server → .NET API
│   │   ├── clientInterceptors.ts
│   │   └── serverInterceptors.ts
│   ├── auth/
│   │   ├── session.ts
│   │   └── jwt.ts
│   └── utils/
│       ├── lodash.ts
│       ├── dayjs.ts
│       └── numeral.ts
│
├── store/
│   ├── auth.store.ts
│   ├── ui.store.ts
│   └── index.ts
│
├── styles/
│   ├── theme/
│   │   ├── theme.ts                  ← MUI Theme (Primary: Blue)
│   │   ├── palette.ts
│   │   └── typography.ts
│   └── globals.css
│
├── types/
│   ├── api.types.ts
│   ├── auth.types.ts
│   └── common.types.ts
│
└── hooks/
    ├── useSession.ts
    └── useAxios.ts
```

## Module Pattern — ทุกหน้าต้องทำแบบนี้

### page.tsx (Server Component — Entry Point Only)

```tsx
// app/(dashboard)/users/page.tsx
import UsersModule from '@/modules/Users/UsersModule'

// ✅ รับ searchParams สำหรับ SSR เท่านั้น
export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  return <UsersModule initialParams={params} />
}
```

### [Name]Module.tsx (Client Wrapper — Logic ทั้งหมด)

```tsx
// modules/Users/UsersModule.tsx
'use client'

import { PageWrapper, ContentBox } from './UsersModule.style'
import { USER_COLUMNS } from './UsersModule.data'
import { useUsersStore } from './UsersModule.store'

interface UsersModuleProps {
  initialParams: { page?: string; search?: string }
}

export default function UsersModule({ initialParams }: UsersModuleProps) {
  // state, events, fetch ทั้งหมดอยู่ที่นี่
  return (
    <PageWrapper>
      <ContentBox>
        {/* UI */}
      </ContentBox>
    </PageWrapper>
  )
}
```

### [Name]Module.data.ts (Constants & Column Config)

```ts
// modules/Users/UsersModule.data.ts
import { GridColDef } from '@mui/x-data-grid'

export const USER_COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'ชื่อ', flex: 1 },
  { field: 'email', headerName: 'อีเมล', flex: 1 },
]

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const
```

## 'use client' Rule

เพิ่ม `'use client'` เฉพาะเมื่อ component ใช้:
- `useState`, `useEffect`, `useReducer`, `useRef`
- Browser API (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Third-party hooks ที่ต้องการ browser context

**Server Component ทำได้:** async/await, fetch data, pass props ลงไป