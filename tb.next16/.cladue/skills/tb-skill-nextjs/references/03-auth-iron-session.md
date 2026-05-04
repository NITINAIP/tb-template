# 03 — Authentication & Iron Session

## Auth Flow

```
1. User login → POST /api/auth/login
2. API Route รับ Token จาก .NET → เก็บใน iron-session cookie
3. Middleware ตรวจ session ทุก request → redirect ถ้าไม่มี session
4. axiosServer ดึง token จาก session → แนบ Bearer header → .NET API
```

## Session Config

```ts
// src/lib/auth/session.ts
import { SessionOptions } from 'iron-session'

export interface SessionData {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    name: string
    email: string
    roles: string[]
  }
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,  // ต้อง >= 32 chars
  cookieName: 'tb-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,    // JS อ่านไม่ได้ — XSS safe
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,  // 8 ชั่วโมง
  },
}
```

## Login API Route

```ts
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData } from '@/lib/auth/session'
import { axiosServer } from '@/lib/axios/axiosServer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // เรียก .NET auth endpoint
    const { data } = await axiosServer.post<{
      accessToken: string
      refreshToken: string
      user: SessionData['user']
    }>('/auth/login', body)

    // บันทึกลง iron-session
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    session.accessToken  = data.accessToken
    session.refreshToken = data.refreshToken
    session.user         = data.user
    session.isLoggedIn   = true
    await session.save()

    return NextResponse.json({ success: true, user: data.user })
  } catch {
    return NextResponse.json({ message: 'Login failed' }, { status: 401 })
  }
}
```

## Logout API Route

```ts
// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
  return NextResponse.json({ success: true })
}
```

## Middleware (Auth Guard)

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData } from '@/lib/auth/session'

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/callback']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ปล่อยผ่าน public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // ตรวจ session
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## useSession Hook (Client)

```ts
// src/hooks/useSession.ts
'use client'
import { useAuthStore } from '@/store/auth.store'
import { axiosClient } from '@/lib/axios/axiosClient'

export function useSession() {
  const { user, setUser, clearUser } = useAuthStore()

  async function logout() {
    await axiosClient.post('/api/auth/logout')
    clearUser()
    window.location.href = '/login'
  }

  return { user, logout }
}
```

## Token Rules

```
✅ เก็บใน iron-session (httpOnly cookie)
✅ อ่านได้เฉพาะ server-side (API Route, Middleware)
✅ axiosServer interceptor ดึงและแนบอัตโนมัติ

❌ localStorage.setItem('token', ...)
❌ sessionStorage.setItem('token', ...)
❌ cookie ธรรมดา (ไม่ httpOnly)
❌ ส่ง token ใน URL query string
```