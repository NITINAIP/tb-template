# Fluent UI-Inspired MUI Theme

## Overview

The application uses a custom Material-UI theme aligned with **Fluent UI design principles** while maintaining the **#fe9a00** warm orange brand color. This theme provides a modern, accessible, and professional appearance across all components.

## Key Features

### Design Principles
- **Clarity:** Refined typography and visual hierarchy
- **Depth:** Subtle shadows and elevations (Fluent UI style)
- **Accessibility:** WCAG AAA contrast ratios, prominent focus indicators, reduced motion support

### Color Palette
- **Primary:** #fe9a00 (warm orange brand color)
- **Neutrals:** Fluent UI gray palette (#f5f5f5, #e0e0e0, #757575, #333333)
- **Semantics:** Error (#c4373e), Warning (#ff8c00), Success (#107c10), Info (#0078d4)
- **All colors:** WCAG AAA compliant

### Typography
- **Font:** Segoe UI (Fluent UI standard) with fallback stack
- **Headings:** H1-H6 (32px down to 14px) with 600 weight
- **Body:** Refined sizing with improved readability (line height 1.43-1.5)
- **Spacing:** Letter spacing for refined appearance

### Component Styling
- **Buttons:** Fluent UI spacing, smooth transitions, prominent focus indicators
- **Inputs:** Subtle borders, Fluent UI focus color (#fe9a00), 4px radius
- **Cards/Surfaces:** Subtle shadows, borders, consistent spacing
- **Accessibility:** Keyboard navigation, visible focus rings, reduced motion support

## Theme Location

**File:** `lib/theme/index.ts`

This file exports the MUI theme created using `createTheme()`.

## Integration

The theme is applied globally in `app/layout.tsx` via `ThemeProvider`:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
```

## Customizing the Theme

### Changing Colors

Edit `lib/theme/index.ts` and update the palette:

```typescript
palette: {
  primary: {
    main: '#YOUR_COLOR',      // Primary color
    light: '#LIGHT_SHADE',
    dark: '#DARK_SHADE',
    contrastText: '#fff',
  },
}
```

### Updating Typography

Modify the `typography` section:

```typescript
typography: {
  fontFamily: '"Your Font", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
}
```

### Adding Component Overrides

Extend the `components` section with custom styles:

```typescript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        // ... custom styles
      },
    },
  },
}
```

## Testing Changes

### Run Development Server
```bash
npm run dev
```

### Test Pages
- Home: `http://localhost:3000`
- MUI Input Demo: `http://localhost:3000/mui-input-demo`
- Zod Validation Demo: `http://localhost:3000/zod-validation-demo`

### Verify
- ✓ Colors display correctly
- ✓ Buttons and forms render properly
- ✓ Focus indicators are visible
-✓ Typography renders (Segoe UI or fallback)
- ✓ Keyboard navigation works

## Accessibility Verification

### Color Contrast
Use these tools to verify WCAG AAA compliance:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Chrome DevTools Accessibility Panel](https://developer.chrome.com/docs/devtools/accessibility/reference/)

### Focus Indicators
- Press Tab to navigate - all interactive elements should have visible focus rings
- Focus color: #fe9a00
- Outline width: 2px with 2px offset

### Reduced Motion
Test in system preferences:
- **Windows:** Settings > Ease of Access > Display > Turn on the option to simplify and focus the display
- **macOS:** System Preferences > Accessibility > Display > Reduce motion
- **iOS:** Settings > Accessibility > Motion > Reduce Motion

## Browser Support

The theme works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Color Reference

### Primary Brand
```
#fe9a00 (Warm Orange)
```

### Neutral Palette
```
#ffffff (Surface)
#f5f5f5 (Surface Alt)
#e0e0e0 (Subtle/Borders)
#757575 (Secondary)
#616161 (Tertiary)
#333333 (Primary Text)
```

### Semantic Colors
```
Error:   #c4373e
Warning: #ff8c00
Success: #107c10
Info:    #0078d4
```

## Typography Reference

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | 600 | 1.25 |
| H2 | 28px | 600 | 1.29 |
| H3 | 24px | 600 | 1.33 |
| H4 | 20px | 600 | 1.4 |
| H5 | 16px | 600 | 1.5 |
| H6 | 14px | 600 | 1.43 |
| Body1 | 16px | 400 | 1.5 |
| Body2 | 14px | 400 | 1.43 |
| Caption | 12px | 400 | 1.33 |

## Resources

- [Fluent UI Design System](https://developer.microsoft.com/en-us/fluent/)
- [MUI Theming](https://mui.com/material-ui/customization/theming/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Migration Guide

For details on what changed from the original theme, see [FLUENT_MIGRATION_GUIDE.md](./FLUENT_MIGRATION_GUIDE.md).

## Support

For issues or questions about the theme:
1. Check [FLUENT_MIGRATION_GUIDE.md](./FLUENT_MIGRATION_GUIDE.md) for FAQs
2. Review MUI documentation at https://mui.com/
3. Consult Fluent UI design principles at https://developer.microsoft.com/en-us/fluent/

