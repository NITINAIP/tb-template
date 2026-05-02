import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectField } from "@/components/forms/fields/SelectField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

describe("SelectField", () => {
  it("renders label", () => {
    renderWithProviders(<SelectField name="choice" label="Choice" options={options} />);
    expect(screen.getByLabelText(/choice/i)).toBeInTheDocument();
  });

  it("renders all options in the dropdown", async () => {
    renderWithProviders(<SelectField name="choice" label="Choice" options={options} />);
    // Open the select
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option B" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option C" })).toBeInTheDocument();
  });

  it("selects an option when clicked", async () => {
    renderWithProviders(<SelectField name="choice" label="Choice" options={options} defaultValue="" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Option B" }));
    expect(screen.getByRole("combobox")).toHaveTextContent("Option B");
  });

  it("renders error state", () => {
    renderWithProviders(
      <SelectField name="choice" label="Choice" options={options} error="Choice is required" />
    );
    expect(screen.getByText("Choice is required")).toBeInTheDocument();
  });
});
