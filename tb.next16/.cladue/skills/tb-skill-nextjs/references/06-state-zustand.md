# 06 — State Management — Zustand

## กฎหลัก

```
✅ Global state → store/ (auth, ui, dialog)
✅ Module-scoped state → [Module]Module.store.ts
✅ ใช้ persist middleware + sessionStorage สำหรับ auth state
❌ ห้ามเก็บ token ใน store — ใช้ iron-session เท่านั้น
❌ ห้ามใช้ Redux / Context API สำหรับ global state
```

## Global Auth Store

```ts
// src/store/auth.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'tb-auth',
      storage: createJSONStorage(() => sessionStorage),  // ไม่ใช่ localStorage
    }
  )
)
```

## Global UI Store

```ts
// src/store/ui.store.ts
import { create } from 'zustand'

interface DialogConfig {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onConfirm?: () => void
}

interface UIState {
  isLoading: boolean
  dialog: DialogConfig | null
  setLoading: (loading: boolean) => void
  showDialog: (config: DialogConfig) => void
  closeDialog: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  isLoading: false,
  dialog: null,
  setLoading: (isLoading) => set({ isLoading }),
  showDialog: (dialog) => set({ dialog }),
  closeDialog: () => set({ dialog: null }),
}))
```

## Module-scoped Store

```ts
// modules/Users/UsersModule.store.ts
import { create } from 'zustand'
import { User } from '@/types/api.types'

interface UsersState {
  users: User[]
  total: number
  page: number
  pageSize: number
  search: string
  isLoading: boolean
  setUsers: (users: User[], total: number) => void
  setPage: (page: number) => void
  setSearch: (search: string) => void
  setLoading: (loading: boolean) => void
}

export const useUsersStore = create<UsersState>()((set) => ({
  users: [],
  total: 0,
  page: 0,
  pageSize: 20,
  search: '',
  isLoading: false,
  setUsers: (users, total) => set({ users, total }),
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 0 }),
  setLoading: (isLoading) => set({ isLoading }),
}))
```

## วิธีใช้ใน Component

```tsx
'use client'
import { useUsersStore } from './UsersModule.store'
import { useUIStore } from '@/store/ui.store'
import { axiosClient } from '@/lib/axios/axiosClient'

export default function UsersModule() {
  const { users, page, search, isLoading, setUsers, setLoading } = useUsersStore()
  const { showDialog } = useUIStore()

  async function fetchUsers() {
    setLoading(true)
    try {
      const { data } = await axiosClient.get('/api/users', {
        params: { page, search },
      })
      setUsers(data.items, data.total)
    } catch {
      showDialog({ type: 'error', message: 'โหลดข้อมูลไม่สำเร็จ' })
    } finally {
      setLoading(false)
    }
  }

  // ...
}
```

## Reset Store ใน Test

```ts
// ใน beforeEach ของ test
import { useUsersStore } from './UsersModule.store'

beforeEach(() => {
  useUsersStore.setState({
    users: [], total: 0, page: 0, search: '', isLoading: false,
  })
  sessionStorage.clear()
})
```