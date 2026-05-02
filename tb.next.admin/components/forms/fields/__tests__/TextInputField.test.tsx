import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInputField } from "@/components/forms/fields/TextInputField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

describe("TextInputField", () => {
  it("renders label", () => {
    renderWithProviders(<TextInputField name="email" label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders with a provided value", () => {
    renderWithProviders(<TextInputField name="email" label="Email" value="test@example.com" readOnly />);
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    renderWithProviders(<TextInputField name="email" label="Email" helperText="Enter your email" />);
    expect(screen.getByText("Enter your email")).toBeInTheDocument();
  });

  it("renders error state with error message replacing helper text", () => {
    renderWithProviders(
      <TextInputField name="email" label="Email" helperText="Enter email" error="Email is invalid" />
    );
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(screen.queryByText("Enter email")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChange when user types", async () => {
    const onChange = jest.fn();
    renderWithProviders(<TextInputField name="email" label="Email" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(onChange).toHaveBeenCalled();
  });
});
