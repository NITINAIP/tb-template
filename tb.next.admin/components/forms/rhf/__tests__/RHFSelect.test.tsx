import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { RHFSelect } from "@/components/forms/rhf/RHFSelect";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

type FormValues = { color: string };

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: (v: FormValues) => void }) {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { color: "" } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFSelect control={control} name="color" label="Color" options={options} />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFSelect", () => {
  it("renders select with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
  });

  it("updates field value on selection change", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<TestForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Green" })).toBeInTheDocument();
    });
    await userEvent.click(screen.getByRole("option", { name: "Green" }));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ color: "green" }), expect.anything());
    });
  });
});
