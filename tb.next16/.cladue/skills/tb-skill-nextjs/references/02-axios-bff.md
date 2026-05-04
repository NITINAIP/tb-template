# 02 — Axios BFF Pattern (Two Instances)

## Data Flow

```
Client Component
    │  axiosClient.get('/api/users')
    ▼
Next.js API Route  /app/api/users/route.ts
    │  axiosServer.get('/users')
    ▼
.NET Backend API
```

## Instance ที่ 1 — axiosClient (Client Side)

```ts
// src/lib/axios/axiosClient.ts
import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: '',          // same-origin → Next.js API Routes
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
```

```ts
// src/lib/axios/clientInterceptors.ts
import { axiosClient } from './axiosClient'

// Request: ไม่ต้องใส่ token (cookie ส่งอัตโนมัติ)
axiosClient.interceptors.request.use((config) => config)

// Response: จัดการ global error
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    // แสดง toast error ผ่าน UI store
    return Promise.reject(error)
  }
)
```

## Instance ที่ 2 — axiosServer (Server Side)

```ts
// src/lib/axios/axiosServer.ts
import axios from 'axios'

export const axiosServer = axios.create({
  baseURL: process.env.DOTNET_API_URL,   // server-side only
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})
```

```ts
// src/lib/axios/serverInterceptors.ts
import { axiosServer } from './axiosServer'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/lib/auth/session'
import { cookies } from 'next/headers'

// Request: แนบ JWT จาก iron-session
axiosServer.interceptors.request.use(async (config) => {
  const session = await getIronSession(await cookies(), sessionOptions)
  if (session.accessToken) {
    config.headers['Authorization'] = `Bearer ${session.accessToken}`
  }
  return config
})

// Response: จัดการ 401 + refresh token
axiosServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      // TODO: refresh token logic
    }
    return Promise.reject(error)
  }
)
```

## สรุปกฎการใช้งาน

| | `axiosClient` | `axiosServer` |
|---|---|---|
| ใช้ใน | Client Component, Custom Hook | `route.ts` เท่านั้น |
| ยิงไปที่ | `/api/*` (Next.js) | `.NET API` |
| Token | ❌ ไม่แตะ (cookie auto) | ✅ Bearer จาก iron-session |
| Import ใน client component | ✅ | ❌ FORBIDDEN |
| Import ใน `route.ts` | ❌ ไม่จำเป็น | ✅ Required |

## API Route Pattern

```ts
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { axiosServer } from '@/lib/axios/axiosServer'
import '@/lib/axios/serverInterceptors'   // register ก่อนเสมอ
import { AxiosError } from 'axios'

export async function GET(req: NextRequest) {
  try {
    const { data } = await axiosServer.get('/users', {
      params: Object.fromEntries(req.nextUrl.searchParams),
    })
    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data } = await axiosServer.post('/users', body)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}

// Centralized error handler
function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500
    const message = error.response?.data?.message ?? 'Internal Server Error'
    return NextResponse.json({ message }, { status })
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
}
```

## Dynamic Route

```ts
// src/app/api/users/[id]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data } = await axiosServer.get(`/users/${id}`)
    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
```

## วิธีใช้ใน Client Component / Hook

```tsx
// ✅ ถูกต้อง — ผ่าน axiosClient ไปยัง /api/*
import { axiosClient } from '@/lib/axios/axiosClient'
import '@/lib/axios/clientInterceptors'

const { data } = await axiosClient.get('/api/users')

// ❌ ผิด — ห้ามเรียก .NET โดยตรง
import { axiosServer } from '@/lib/axios/axiosServer'
const { data } = await axiosServer.get('/users')
```