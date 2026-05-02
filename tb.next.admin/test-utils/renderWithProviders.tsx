import React, { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormProvider, useForm, type FieldValues, type DefaultValues } from "react-hook-form";
import theme from "@/lib/theme";

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Render a component inside RHF FormProvider with a fresh useForm instance.
 * Use this for testing RHF wrapper components.
 */
export function renderWithForm<TFieldValues extends FieldValues = FieldValues>(
  ui: ReactElement,
  { defaultValues }: { defaultValues?: DefaultValues<TFieldValues> } = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    const methods = useForm<TFieldValues>({ defaultValues });
    return (
      <AllProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </AllProviders>
    );
  }
  return render(ui, { wrapper: Wrapper });
}
