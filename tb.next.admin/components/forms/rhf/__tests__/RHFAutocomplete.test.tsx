import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { RHFAutocomplete } from "@/components/forms/rhf/RHFAutocomplete";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "TypeScript", value: "ts" },
  { label: "JavaScript", value: "js" },
  { label: "Python", value: "py" },
];

type FormValues = { lang: string };

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: (v: FormValues) => void }) {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { lang: "" } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFAutocomplete control={control} name="lang" label="Language" options={options} />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFAutocomplete", () => {
  it("renders autocomplete input with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });

  it("updates field value on option select", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<TestForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "TypeScript" })).toBeInTheDocument();
    });
    await userEvent.click(screen.getByRole("option", { name: "TypeScript" }));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ lang: "ts" }),
        expect.anything()
      );
    });
  });
});
