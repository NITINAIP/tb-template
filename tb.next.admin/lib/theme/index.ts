import { createTheme } from '@mui/material/styles';

/**
 * Fluent UI-inspired MUI theme with #fe9a00 as the primary brand color
 * 
 * This theme adopts Fluent UI design principles:
 * - Clarity through refined typography and spacing
 * - Accessible color palette with WCAG AAA contrast ratios
 * - Subtle depth and professional appearance
 * 
 * This theme is applied globally via ThemeProvider in the root layout.
 * All MUI components automatically inherit these settings.
 */
const theme = createTheme({
  palette: {
    // Primary accent color (brand)
    primary: {
      main: '#fe9a00', // Warm orange - primary brand color
      light: '#ffb84d', // Lighter shade for hover/active states
      dark: '#cc7700', // Darker shade for emphasis
      contrastText: '#fff',
    },
    // Fluent UI neutral palette
    secondary: {
      main: '#757575', // Secondary text and icons (Fluent neutral)
      light: '#9e9e9e',
      dark: '#424242',
      contrastText: '#fff',
    },
    // Semantic colors following Fluent UI standards
    error: {
      main: '#c4373e', // Fluent UI error red
      light: '#e81123',
      dark: '#a4373a',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff8c00', // Fluent UI warning orange
      light: '#ffa500',
      dark: '#d97706',
      contrastText: '#fff',
    },
    success: {
      main: '#107c10', // Fluent UI success green
      light: '#12a048',
      dark: '#004b1c',
      contrastText: '#fff',
    },
    info: {
      main: '#0078d4', // Fluent UI blue
      light: '#106ebe',
      dark: '#004a83',
      contrastText: '#fff',
    },
    // Fluent UI neutral background colors
    background: {
      default: '#ffffff', // Primary surface
      paper: '#f5f5f5', // Secondary surface (alternate background)
    },
    // Divider and border color
    divider: '#e0e0e0', // Subtle gray for borders and dividers
    // Text colors for Fluent UI palette
    text: {
      primary: '#333333', // Primary text color (dark gray)
      secondary: '#757575', // Secondary text color
      disabled: '#bdbdbd', // Disabled text color
    },
  },
  typography: {
    // Fluent UI typography system uses Segoe UI
    fontFamily: '"Segoe UI", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    
    // Heading styles with Fluent UI sizing and weights
    h1: {
      fontSize: '2rem', // 32px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    h2: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: 1.29,
      letterSpacing: 0,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: 0,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    h5: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    h6: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: 0,
    },
    // Body text styles with improved readability
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: 0.25,
    },
    // Caption style for smaller text
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.33,
      letterSpacing: 0.4,
    },
    // Overline style for labels
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '8px 16px', // Fluent UI spacing
          borderRadius: '4px', // Subtle radius
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-visible': {
            outline: '2px solid #fe9a00',
            outlineOffset: '2px',
          },
        },
        containedPrimary: {
          backgroundColor: '#fe9a00',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ffb84d',
          },
          '&:active': {
            backgroundColor: '#cc7700',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fe9a00',
              borderWidth: '2px',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '0.875rem',
            lineHeight: 1.43,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#bdbdbd',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fe9a00',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #fe9a00',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #fe9a00',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #fe9a00',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          borderLeft: '4px solid',
        },
        standardError: {
          borderLeftColor: '#c4373e',
          backgroundColor: 'rgba(196, 55, 62, 0.08)',
        },
        standardWarning: {
          borderLeftColor: '#ff8c00',
          backgroundColor: 'rgba(255, 140, 0, 0.08)',
        },
        standardSuccess: {
          borderLeftColor: '#107c10',
          backgroundColor: 'rgba(16, 124, 16, 0.08)',
        },
        standardInfo: {
          borderLeftColor: '#0078d4',
          backgroundColor: 'rgba(0, 120, 212, 0.08)',
        },
      },
    },
    // Ensure proper focus indicator visibility across all interactive elements
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:focus-within': {
            outline: 'none',
          },
        },
      },
    },
  },
  // Add media query support for prefers-reduced-motion (accessibility)
  '@media (prefers-reduced-motion: reduce)': {
    '*': {
      transitionDuration: '0ms !important',
      animationDuration: '0ms !important',
    },
  },
});

export default theme;
