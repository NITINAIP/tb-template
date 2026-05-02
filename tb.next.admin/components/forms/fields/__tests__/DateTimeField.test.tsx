import React from "react";
import { screen } from "@testing-library/react";
import dayjs from "dayjs";
import { DateTimeField } from "@/components/forms/fields/DateTimeField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

describe("DateTimeField", () => {
  it("renders with label", () => {
    renderWithProviders(
      <DateTimeField
        name="scheduledAt"
        label="Scheduled At"
        value={null}
        onChange={jest.fn()}
      />
    );
    // MUI DateTimePicker renders the label text in the DOM
    expect(screen.getByText("Scheduled At", { selector: "label" })).toBeInTheDocument();
  });

  it("renders the date picker input sections", () => {
    renderWithProviders(
      <DateTimeField
        name="scheduledAt"
        label="Scheduled At"
        value={dayjs("2026-01-15T10:00:00")}
        onChange={jest.fn()}
      />
    );
    // MUI DateTimePicker renders month/day/year/time as spinbutton sections
    expect(screen.getAllByRole("spinbutton").length).toBeGreaterThan(0);
  });

  it("renders error state", () => {
    renderWithProviders(
      <DateTimeField
        name="scheduledAt"
        label="Scheduled At"
        value={null}
        onChange={jest.fn()}
        error="Date is required"
      />
    );
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });

  it("renders helper text when no error", () => {
    renderWithProviders(
      <DateTimeField
        name="scheduledAt"
        label="Scheduled At"
        value={null}
        onChange={jest.fn()}
        helperText="Select a date and time"
      />
    );
    expect(screen.getByText("Select a date and time")).toBeInTheDocument();
  });
});
