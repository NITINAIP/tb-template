# 07 — Testing — Jest + React Testing Library

## กฎหลัก

```
✅ ทุก utility function ต้องมี unit test
✅ ทุก form component ต้องมี test
✅ Test file อยู่ที่ __tests__/ ข้างๆ source
✅ Reset Zustand store ใน beforeEach เสมอ
❌ ห้าม test implementation detail — test behavior เท่านั้น
```

## jest.config.ts

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/types/**'],
  coverageThreshold: {
    global: { branches: 70, functions: 80, lines: 80, statements: 80 },
  },
}

export default createJestConfig(config)
```

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

## Test Utility Function

```ts
// src/lib/utils/__tests__/currency.test.ts
import { formatCurrency } from '../numeral'

describe('formatCurrency', () => {
  it('formats THB with symbol', () => {
    expect(formatCurrency(1000)).toBe('฿1,000.00')
  })
  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('฿0.00')
  })
  it('handles negative', () => {
    expect(formatCurrency(-500)).toBe('-฿500.00')
  })
})
```

## Test API Route

```ts
// src/app/api/users/__tests__/route.test.ts
import { GET, POST } from '../route'
import { NextRequest } from 'next/server'

// Mock axiosServer
jest.mock('@/lib/axios/axiosServer', () => ({
  axiosServer: { get: jest.fn(), post: jest.fn() },
}))
// Mock interceptors (prevent side effects)
jest.mock('@/lib/axios/serverInterceptors', () => {})

import { axiosServer } from '@/lib/axios/axiosServer'
const mockAxios = jest.mocked(axiosServer)

describe('GET /api/users', () => {
  it('returns users successfully', async () => {
    mockAxios.get.mockResolvedValue({ data: { items: [{ id: '1', name: 'สมชาย' }], total: 1 } })

    const req = new NextRequest('http://localhost/api/users')
    const res = await GET(req)

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.items).toHaveLength(1)
  })

  it('returns 500 on error', async () => {
    mockAxios.get.mockRejectedValue(new Error('Network Error'))

    const req = new NextRequest('http://localhost/api/users')
    const res = await GET(req)

    expect(res.status).toBe(500)
  })
})
```

## Test React Component + Form

```tsx
// modules/Users/components/__tests__/UserFormDialog.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserFormDialog } from '../UserFormDialog'

describe('UserFormDialog', () => {
  it('shows validation error when name is empty', async () => {
    const onSubmit = jest.fn()
    render(<UserFormDialog onSubmit={onSubmit} />)

    // คลิก submit โดยไม่กรอก
    await userEvent.click(screen.getByRole('button', { name: /บันทึก/i }))

    expect(await screen.findByText('กรุณากรอกชื่อ')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with correct data', async () => {
    const onSubmit = jest.fn()
    render(<UserFormDialog onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('ชื่อ-นามสกุล'), 'สมชาย ใจดี')
    await userEvent.type(screen.getByLabelText('อีเมล'), 'somchai@example.com')
    await userEvent.type(screen.getByLabelText('เบอร์โทรศัพท์'), '0812345678')
    await userEvent.click(screen.getByRole('button', { name: /บันทึก/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        phone: '0812345678',
        role: 'user',
      })
    })
  })
})
```

## Test Zustand Store

```ts
// store/__tests__/ui.store.test.ts
import { useUIStore } from '../ui.store'

beforeEach(() => {
  useUIStore.setState({ isLoading: false, dialog: null })
})

describe('useUIStore', () => {
  it('showDialog sets dialog config', () => {
    const { showDialog } = useUIStore.getState()
    showDialog({ type: 'success', message: 'บันทึกสำเร็จ' })
    expect(useUIStore.getState().dialog?.message).toBe('บันทึกสำเร็จ')
  })

  it('closeDialog clears dialog', () => {
    useUIStore.setState({ dialog: { type: 'error', message: 'ผิดพลาด' } })
    useUIStore.getState().closeDialog()
    expect(useUIStore.getState().dialog).toBeNull()
  })
})
```

## Commands

```bash
npm run test               # run all
npm run test:watch         # watch mode
npm run test:coverage      # coverage report
npm run test:ci            # CI (fail if threshold not met)
```