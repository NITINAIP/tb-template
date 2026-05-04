---
name: tb-skill-nextjs
description: >
  Enterprise Next.js 16 (App Router) development standards and conventions for the TB project.
  Use this skill whenever working on ANY Next.js task in this project — including project setup,
  folder structure, page/module creation, API routes, Axios BFF pattern, authentication with
  iron-session, MUI styling, React Hook Form + Zod forms, Zustand state management, and Jest
  testing. Also trigger when the user mentions "สร้างหน้า", "สร้าง module", "เรียก API",
  "ทำ form", "ทำ auth", "จัดการ state", "เขียน test", "styled component", "axiosClient",
  "axiosServer", หรือถามเกี่ยวกับ convention ของโปรเจกต์นี้.
  This skill MUST be read before writing any code in this project.
---

# TB Next.js 16 Enterprise — Skill Router

อ่านไฟล์ reference ที่ตรงกับงานที่ต้องทำ **ก่อนเขียน code ทุกครั้ง**

## Sub-topic Map

| หัวข้อ | ไฟล์ Reference | เมื่อไหร่ |
|--------|----------------|-----------|
| Project Structure & Module Pattern | `references/01-project-structure.md` | สร้างหน้าใหม่, สร้าง module, ตั้งค่าโปรเจกต์ |
| Axios — Two Instances (Client & Server) | `references/02-axios-bff.md` | เรียก API, สร้าง API Route, fetch data |
| Auth & Iron Session | `references/03-auth-iron-session.md` | login, logout, session, middleware, protected route |
| MUI Styling Convention | `references/04-styling-mui.md` | styled component, theme, ห้ามใช้ inline style |
| Form — React Hook Form + Zod | `references/05-form-rhf-zod.md` | สร้าง form, validate, input mask |
| State — Zustand | `references/06-state-zustand.md` | global state, module store, session sync |
| Testing — Jest | `references/07-testing-jest.md` | unit test, mock, coverage |

## Core Rules (อ่านทุกครั้ง)

```
❌ ห้าม inline style (style={{}} หรือ sx prop)
❌ ห้าม Client เรียก .NET API โดยตรง
❌ ห้ามเก็บ Token ใน localStorage / sessionStorage
❌ ห้ามใช้ useState สำหรับ form fields
❌ ห้ามใช้ any ใน TypeScript
✅ ใช้ axiosClient  → /api/* เท่านั้น (Client side)
✅ ใช้ axiosServer  → .NET API เท่านั้น (Server / route.ts)
✅ Token เก็บใน iron-session (httpOnly cookie) เท่านั้น
✅ Form ต้องใช้ React Hook Form + Zod เสมอ
✅ Styled component ต้องอยู่ใน .style.ts เท่านั้น
```

## Page / Module Pattern (Quick Ref)

```
app/(dashboard)/users/page.tsx          ← Server Component (ไม่มี logic)
modules/Users/UsersModule.tsx           ← 'use client' — logic ทั้งหมดอยู่ที่นี่
modules/Users/UsersModule.style.ts      ← styled() ทุกตัว
modules/Users/UsersModule.data.ts       ← columns, constants, enums
modules/Users/UsersModule.store.ts      ← Zustand (module-scoped)
modules/Users/components/              ← sub-components
```

> **วิธีใช้:** ดู table ด้านบน → เปิดไฟล์ reference ที่ตรงกับงาน → อ่านก่อนเขียน code