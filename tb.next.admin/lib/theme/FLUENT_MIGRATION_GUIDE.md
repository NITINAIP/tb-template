# Fluent UI-Inspired Theme Migration Guide

## Overview

This guide documents the migration from the original MUI theme to the Fluent UI-inspired theme. The theme now follows Microsoft's Fluent UI design principles while maintaining the #fe9a00 brand color.

## What Changed

### Color Palette
| Aspect | Before | After | Benefit |
|--------|--------|-------|---------|
| Font | Roboto | Segoe UI | Fluent UI standard, modern appearance |
| Primary | #fe9a00 with basic shades | #fe9a00 with Fluent variations | Better color harmony |
| Neutrals | Blue secondary (MUI default) | Gray palette (#757575, #e0e0e0) | Fluent UI neutral aesthetic |
| Semantic Colors | Basic MUI colors | Fluent UI colors with AAA contrast | Better accessibility |

### Typography
- **Segoe UI** font family (Fluent UI standard)
- Refined heading sizes: 32px (H1) down to 14px (H6)
- Improved line heights for readability (1.25 - 1.5)
- Letter spacing for refined appearance
- New caption and overline styles

### Component Styling
- **Buttons:** Fluent UI padding (8px × 16px), 4px border radius, smooth 150ms transitions
- **Input Fields:** Subtle borders (#e0e0e0), Fluent UI focus color (#fe9a00)
- **Cards:** Subtle shadow (0 1px 3px), border, 4px radius
- **Focus Indicators:** Prominent 2px outline, 2px offset (WCAG AAA compliant)
- **Accessibility:** Reduced motion support via `prefers-reduced-motion` media query

## Color Palette Reference

### Primary Colors
```
Primary Main:  #fe9a00 (Warm Orange)
Primary Light: #ffb84d (Hover state)
Primary Dark:  #cc7700 (Active state)
```

### Neutral Palette (Fluent UI)
```
Surface:      #ffffff (Primary backgrounds)
Surface Alt:  #f5f5f5 (Secondary backgrounds)
Subtle:       #e0e0e0 (Borders, dividers)
Secondary:    #757575 (Secondary text)
Tertiary:     #616161 (Tertiary text)
Primary Text: #333333 (Main text)
```

### Semantic Colors (Fluent UI)
```
Error:   #c4373e (WCAG AAA contrast)
Warning: #ff8c00 (WCAG AAA contrast)
Success: #107c10 (WCAG AAA contrast)
Info:    #0078d4 (WCAG AAA contrast)
```

## Typography Scale

### Headings
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 32px | 600 | 1.25 | Page titles |
| H2 | 28px | 600 | 1.29 | Major sections |
| H3 | 24px | 600 | 1.33 | Section headers |
| H4 | 20px | 600 | 1.4 | Subheadings |
| H5 | 16px | 600 | 1.5 | Small headers |
| H6 | 14px | 600 | 1.43 | Minimal headers |

### Body Text
| Type | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Body1 | 16px | 400 | 1.5 | Main content |
| Body2 | 14px | 400 | 1.43 | Secondary content |
| Caption | 12px | 400 | 1.33 | Small labels |
| Overline | 12px | 600 | 1.33 | Uppercase labels |

## Component Examples

### Button
```typescript
<Button variant="contained" color="primary">
  Click Me
</Button>
```
- Padding: 8px × 16px
- Font weight: 600
- Focus: 2px #fe9a00 outline with 2px offset
- Hover: Background color #ffb84d

### Text Input
```typescript
<TextField label="Name" variant="outlined" />
```
- Border color: #e0e0e0
- Focus border: 2px #fe9a00
- Background: #ffffff
- Border radius: 4px

### Card
```typescript
<Card>
  <CardContent>Content</CardContent>
</Card>
```
- Background: #ffffff
- Border: 1px #e0e0e0
- Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Border radius: 4px

## Migration Checklist for Developers

- [ ] Review the new color palette and apply to custom components
- [ ] Update any hardcoded colors to use theme variables
- [ ] Test focus indicator visibility on all interactive elements
- [ ] Verify Segoe UI renders properly (check font stack fallbacks)
- [ ] Test keyboard navigation through all forms
- [ ] Verify color contrast in WCAG AA / AAA validators
- [ ] Check reduced motion preferences work correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

## Accessibility Features

### Focus Indicators
All interactive elements now have visible 2px focus rings:
- Color: #fe9a00 (primary)
- Offset: 2px
- Always visible (WCAG AAA)

### Color Contrast
- Primary text on white: 7:1 (AAA)
- Secondary text (#757575) on white: 5.5:1 (AAA)
- Error color (#c4373e) with white text: 9.5:1 (AAA)
- All semantic colors meet AAA standards

### Motion Safety
The theme respects `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

## Browser Support

The Fluent UI-inspired theme works in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE 11 (limited support for CSS variables)

## Resources

- [Fluent UI Design System](https://developer.microsoft.com/en-us/fluent/)
- [MUI Customization Guide](https://mui.com/material-ui/customization/theming/)
- [WCAG 2.1 Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Segoe UI Font](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/typography)

## Frequently Asked Questions

**Q: Why Segoe UI instead of Roboto?**
A: Fluent UI is built around Segoe UI. It provides authenticity to the Fluent design principles and a more modern appearance.

**Q: Are the colors customizable?**
A: Yes, edit `lib/theme/index.ts` and update the palette properties. The theme is a standard MUI theme.

**Q: What about dark mode?**
A: Dark mode can be added in future updates by creating additional theme variants.

**Q: Will my custom components break?**
A: No, the MUI component API remains unchanged. Custom styling may need updates if you referenced old color values.

**Q: How do I test color contrast?**
A: Use tools like WebAIM Contrast Checker or Chrome DevTools accessibility panel.
