import { alpha, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "rgb(243 243 243 / 25%)"
    },
    primary: {
      main: "#F37021"
    },
    secondary: {
      main: "#444444"
    },
    custom: {
      white: "#fff",
      darkGray: "#666666",
      lightGray: "#C4C4C4",
      lightOrange: "#FFAF82",
      lighterGray: "#F0F0F0",
      brickRed: "#E43333",
      darkRed: "#C22B2B"
    }
  },
  typography: {
    fontFamily: "'Kanit', sans-serif"
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#C4C4C4"
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          minWidth: "8rem",
          "&.MuiButton-contained": {
            color: "#fff",
            boxShadow: "none"
          },
          "&.MuiButton-outlined": {
            color: "#F37021",
            borderColor: "#F37021"
          },
          "&.MuiButton-contained:hover": {
            backgroundColor: "#ff843d",
            color: "#fff",
            boxShadow: "none"
          },
          "&.MuiButton-outlined:hover": {
            backgroundColor: "#ff843d",
            borderColor: "#F37021",
            color: "#fff"
          },
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none"
          },
          "&:not(.MuiButton-contained):not(.MuiButton-outlined)": {
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          }
        })
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#C4C4C4",
          "&.Mui-checked": {
            color: "#F37021"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgb(255,255,255,0.1)"
          },
          "& .MuiFilledInput-underline": {
            backgroundColor: "rgb(255,255,255,0.1)"
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#444444"
        }
      }
    }
  }
});
