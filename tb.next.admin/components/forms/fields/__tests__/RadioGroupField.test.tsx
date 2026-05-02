import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroupField } from "@/components/forms/fields/RadioGroupField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Maybe", value: "maybe" },
];

describe("RadioGroupField", () => {
  it("renders group label", () => {
    renderWithProviders(<RadioGroupField name="answer" label="Your answer" options={options} />);
    expect(screen.getByText(/your answer/i)).toBeInTheDocument();
  });

  it("renders all option labels", () => {
    renderWithProviders(<RadioGroupField name="answer" label="Your answer" options={options} />);
    expect(screen.getByLabelText("Yes")).toBeInTheDocument();
    expect(screen.getByLabelText("No")).toBeInTheDocument();
    expect(screen.getByLabelText("Maybe")).toBeInTheDocument();
  });

  it("selects an option when clicked", async () => {
    renderWithProviders(<RadioGroupField name="answer" label="Your answer" options={options} />);
    await userEvent.click(screen.getByLabelText("No"));
    expect(screen.getByLabelText("No")).toBeChecked();
    expect(screen.getByLabelText("Yes")).not.toBeChecked();
  });

  it("renders error state", () => {
    renderWithProviders(
      <RadioGroupField name="answer" label="Your answer" options={options} error="Selection required" />
    );
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });
});
