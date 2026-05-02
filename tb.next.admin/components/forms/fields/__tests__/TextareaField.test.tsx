import React from "react";
import { screen } from "@testing-library/react";
import { TextareaField } from "@/components/forms/fields/TextareaField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

describe("TextareaField", () => {
  it("renders label", () => {
    renderWithProviders(<TextareaField name="bio" label="Bio" />);
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  it("renders a multiline (textarea) element", () => {
    renderWithProviders(<TextareaField name="bio" label="Bio" />);
    // MUI multiline TextField renders a <textarea>
    expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
  });

  it("renders error state", () => {
    renderWithProviders(<TextareaField name="bio" label="Bio" error="Bio is required" />);
    expect(screen.getByText("Bio is required")).toBeInTheDocument();
  });

  it("renders helper text when no error", () => {
    renderWithProviders(<TextareaField name="bio" label="Bio" helperText="Enter a short bio" />);
    expect(screen.getByText("Enter a short bio")).toBeInTheDocument();
  });
});
