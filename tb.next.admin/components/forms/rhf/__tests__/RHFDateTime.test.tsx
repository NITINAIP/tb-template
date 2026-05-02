import React from "react";
import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { RHFDateTime } from "@/components/forms/rhf/RHFDateTime";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

type FormValues = { scheduledAt: string | null };

function TestForm() {
  const { control } = useForm<FormValues>({ defaultValues: { scheduledAt: null } });
  return (
    <form>
      <RHFDateTime control={control} name="scheduledAt" label="Scheduled At" />
    </form>
  );
}

describe("RHFDateTime", () => {
  it("renders date picker within form context", () => {
    renderWithProviders(<TestForm />);
    // MUI DateTimePicker renders the label text in the DOM
    expect(screen.getByText("Scheduled At", { selector: "label" })).toBeInTheDocument();
  });

  it("renders date/time spinbutton sections", () => {
    renderWithProviders(<TestForm />);
    // MUI DateTimePicker renders month/day/year/time as spinbutton sections
    expect(screen.getAllByRole("spinbutton").length).toBeGreaterThan(0);
  });
});
