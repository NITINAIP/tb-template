import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwitchField } from "@/components/forms/fields/SwitchField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

describe("SwitchField", () => {
  it("renders label", () => {
    renderWithProviders(<SwitchField name="notify" label="Enable notifications" />);
    expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument();
  });

  it("is off by default", () => {
    const { container } = renderWithProviders(<SwitchField name="notify" label="Enable notifications" />);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).not.toBeChecked();
  });

  it("toggles switch state when clicked", async () => {
    const { container } = renderWithProviders(<SwitchField name="notify" label="Enable notifications" />);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    await userEvent.click(screen.getByText("Enable notifications"));
    expect(input).toBeChecked();
    await userEvent.click(screen.getByText("Enable notifications"));
    expect(input).not.toBeChecked();
  });

  it("renders in disabled state", () => {
    const { container } = renderWithProviders(<SwitchField name="notify" label="Enable notifications" disabled />);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("renders error helper text", () => {
    renderWithProviders(
      <SwitchField name="notify" label="Enable notifications" error="This field is required" />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
