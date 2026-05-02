import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { RHFCheckbox } from "@/components/forms/rhf/RHFCheckbox";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

type FormValues = { agree: boolean };

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: (v: FormValues) => void }) {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { agree: false } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFCheckbox control={control} name="agree" label="I agree" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFCheckbox", () => {
  it("renders checkbox with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/i agree/i)).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles field value when clicked", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<TestForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ agree: true }), expect.anything());
    });
  });
});
