// esn
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      white: string;
      darkGray: string;
      lightGray: string;
      lightOrange: string;
      lighterGray: string;
      brickRed: string;
      darkRed: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      white: string;
      darkGray: string;
      lightGray: string;
      lightOrange: string;
      lighterGray: string;
      brickRed: string;
      darkRed: string;
    };
  }

  interface Theme extends MuiTheme {
    custom: {
      white: string;
      darkGray: string;
      lightGray: string;
      lightOrange: string;
      lighterGray: string;
      brickRed: string;
      darkRed: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      white: string;
      darkGray: string;
      lightGray: string;
      lightOrange: string;
      lighterGray: string;
      brickRed: string;
      darkRed: string;
    };
  }

  interface Components {
    MuiPickersDay?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultProps?: Partial<PickersDayProps<any>>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styleOverrides?: OverridesStyleRules<any, "MuiPickersDay", Theme>;
    };
  }
}
