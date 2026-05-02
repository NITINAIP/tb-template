import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutocompleteField } from "@/components/forms/fields/AutocompleteField";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
  { label: "Banana", value: "banana" },
];

describe("AutocompleteField", () => {
  it("renders input with label", () => {
    renderWithProviders(
      <AutocompleteField name="fruit" label="Fruit" options={options} />
    );
    expect(screen.getByLabelText(/fruit/i)).toBeInTheDocument();
  });

  it("shows filtered options when user types", async () => {
    renderWithProviders(
      <AutocompleteField name="fruit" label="Fruit" options={options} />
    );
    await userEvent.type(screen.getByRole("combobox"), "ap");
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Apricot" })).toBeInTheDocument();
    });
    expect(screen.queryByRole("option", { name: "Banana" })).not.toBeInTheDocument();
  });

  it("selects an option on click", async () => {
    const onChange = jest.fn();
    renderWithProviders(
      <AutocompleteField name="fruit" label="Fruit" options={options} onChange={onChange} />
    );
    await userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    });
    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(onChange).toHaveBeenCalled();
  });

  it("renders error state", () => {
    renderWithProviders(
      <AutocompleteField name="fruit" label="Fruit" options={options} error="Please select a fruit" />
    );
    expect(screen.getByText("Please select a fruit")).toBeInTheDocument();
  });
});
