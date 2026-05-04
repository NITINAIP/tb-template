# 04 — MUI Styling Convention

## กฎหลัก

```
✅ ใช้ styled() จาก MUI เท่านั้น
✅ ทุก styled component ต้องอยู่ใน [Module].style.ts
✅ Tailwind ใช้สำหรับ layout utility เท่านั้น (flex, grid, gap, w-, h-)
❌ ห้าม style={{...}} ทุกกรณี
❌ ห้าม sx prop (ยกเว้น DataGrid หรือ component ที่ library กำหนด)
❌ ห้าม hardcode color hex ใน component
```

## Theme Setup

```ts
// src/styles/theme/palette.ts
export const palette = {
  primary: {
    main:  '#1a4f8a',
    light: '#2563eb',
    dark:  '#0d2045',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#64748b',
  },
  background: {
    default: '#f8fafc',
    paper:   '#ffffff',
  },
}
```

```ts
// src/styles/theme/theme.ts
import { createTheme } from '@mui/material/styles'
import { palette } from './palette'

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"IBM Plex Sans Thai", "Sarabun", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
})
```

## Styled Component Pattern

```ts
// modules/Users/UsersModule.style.ts
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

// ✅ ใช้ theme token เสมอ
export const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}))

export const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}))

// Props แบบมี variant
export const StatusChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(0.25, 1),
  borderRadius: 100,
  fontSize: '0.75rem',
  fontWeight: 600,
  backgroundColor: active ? theme.palette.success.light : theme.palette.error.light,
  color:           active ? theme.palette.success.dark  : theme.palette.error.dark,
}))
```

## วิธีใช้ใน Component

```tsx
// modules/Users/UsersModule.tsx
'use client'
import { PageWrapper, ContentPaper, SectionTitle, StatusChip } from './UsersModule.style'

export default function UsersModule() {
  return (
    // ✅ Tailwind สำหรับ layout
    <div className="flex flex-col gap-4">
      <PageWrapper>
        <SectionTitle variant="h5">รายชื่อผู้ใช้</SectionTitle>
        <ContentPaper>
          <StatusChip active={true}>ใช้งาน</StatusChip>
        </ContentPaper>
      </PageWrapper>
    </div>
  )
}
```

## ❌ ตัวอย่างที่ห้ามทำ

```tsx
// ❌ inline style
<Box style={{ padding: '24px', color: '#1a4f8a' }}>

// ❌ sx prop
<Box sx={{ p: 3, color: 'primary.main' }}>

// ❌ hardcode color ใน styled
export const Btn = styled(Button)(() => ({
  backgroundColor: '#1a4f8a',   // ❌ ใช้ theme.palette.primary.main แทน
}))
```