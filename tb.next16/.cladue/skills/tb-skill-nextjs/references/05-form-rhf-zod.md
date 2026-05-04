# 05 — Form — React Hook Form + Zod

## กฎหลัก

```
✅ ทุก form ต้องใช้ React Hook Form + Zod เสมอ
✅ zodResolver เชื่อม schema กับ useForm
✅ Input components ทุกตัวต้องรับ control จาก RHF
❌ ห้ามใช้ useState สำหรับ field ทุกตัว
❌ ห้าม validate ด้วย if/else เอง — ใช้ Zod schema เท่านั้น
```

## Zod Schema

```ts
// src/lib/zod/schemas/user.schema.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  name:  z.string().min(1, 'กรุณากรอกชื่อ').max(100),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  phone: z.string().regex(/^0[0-9]{9}$/, 'เบอร์โทร 10 หลัก'),
  role:  z.enum(['admin', 'user', 'viewer'], { message: 'กรุณาเลือก role' }),
})

export type CreateUserForm = z.infer<typeof createUserSchema>
```

## Form Component Pattern

```tsx
// modules/Users/components/UserFormDialog.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema, CreateUserForm } from '@/lib/zod/schemas/user.schema'
import { AppInputText } from '@/components/form/AppInputText'
import { AppInputMask } from '@/components/form/AppInputMask'

interface UserFormDialogProps {
  onSubmit: (data: CreateUserForm) => Promise<void>
}

export function UserFormDialog({ onSubmit }: UserFormDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '', phone: '', role: 'user' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInputText
        name="name"
        control={control}
        label="ชื่อ-นามสกุล"
        error={errors.name}
      />
      <AppInputText
        name="email"
        control={control}
        label="อีเมล"
        error={errors.email}
      />
      <AppInputMask
        name="phone"
        control={control}
        label="เบอร์โทรศัพท์"
        mask="000-000-0000"
        error={errors.phone}
      />
    </form>
  )
}
```

## Atomic Input Components

### AppInputText

```tsx
// src/components/form/AppInputText.tsx
'use client'
import { Controller, Control, FieldError, FieldValues, Path } from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface AppInputTextProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  error?: FieldError
  disabled?: boolean
  multiline?: boolean
  rows?: number
}

export function AppInputText<T extends FieldValues>({
  name, control, label, error, disabled, multiline, rows,
}: AppInputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          fullWidth
        />
      )}
    />
  )
}
```

### AppInputMask

```tsx
// src/components/form/AppInputMask.tsx
'use client'
import { Controller, Control, FieldError, FieldValues, Path } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import TextField from '@mui/material/TextField'

interface AppInputMaskProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  mask: string
  error?: FieldError
}

export function AppInputMask<T extends FieldValues>({
  name, control, label, mask, error,
}: AppInputMaskProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <IMaskInput
          mask={mask}
          value={value}
          onAccept={onChange}
          render={(ref, props) => (
            <TextField
              {...props}
              inputRef={ref}
              label={label}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />
      )}
    />
  )
}
```

### AppInputSearch (with Debounce)

```tsx
// src/components/form/AppInputSearch.tsx
'use client'
import { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from 'lodash'

interface AppInputSearchProps {
  onSearch: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export function AppInputSearch({
  onSearch,
  placeholder = 'ค้นหา...',
  debounceMs = 400,
}: AppInputSearchProps) {
  const [value, setValue] = useState('')

  const debouncedSearch = useCallback(
    debounce((v: string) => onSearch(v), debounceMs),
    [onSearch, debounceMs]
  )

  return (
    <TextField
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        debouncedSearch(e.target.value)
      }}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
```