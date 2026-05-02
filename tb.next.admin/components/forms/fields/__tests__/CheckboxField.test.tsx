import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckboxField } from "@/components/forms/fields/CheckboxField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

describe("CheckboxField", () => {
  it("renders label", () => {
    renderWithProviders(<CheckboxField name="agree" label="I agree" />);
    expect(screen.getByLabelText(/i agree/i)).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    renderWithProviders(<CheckboxField name="agree" label="I agree" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles checked state when clicked", async () => {
    renderWithProviders(<CheckboxField name="agree" label="I agree" />);
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("renders in disabled state", () => {
    renderWithProviders(<CheckboxField name="agree" label="I agree" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders error helper text", () => {
    renderWithProviders(<CheckboxField name="agree" label="I agree" error="You must agree" />);
    expect(screen.getByText("You must agree")).toBeInTheDocument();
  });
});
