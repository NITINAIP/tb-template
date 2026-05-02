import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { RHFSwitch } from "@/components/forms/rhf/RHFSwitch";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

type FormValues = { enabled: boolean };

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: (v: FormValues) => void }) {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { enabled: false } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFSwitch control={control} name="enabled" label="Enable feature" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFSwitch", () => {
  it("renders switch with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/enable feature/i)).toBeInTheDocument();
  });

  it("is off by default", () => {
    const { container } = renderWithProviders(<TestForm />);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).not.toBeChecked();
  });

  it("toggles field value when clicked", async () => {
    const onSubmit = jest.fn();
    const { container } = renderWithProviders(<TestForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByText("Enable feature"));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ enabled: true }), expect.anything());
    });
  });
});
