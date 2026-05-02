import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { RHFRadioGroup } from "@/components/forms/rhf/RHFRadioGroup";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

type FormValues = { answer: string };

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: (v: FormValues) => void }) {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { answer: "" } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFRadioGroup control={control} name="answer" label="Do you agree?" options={options} />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFRadioGroup", () => {
  it("renders radio group with options", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText("Yes")).toBeInTheDocument();
    expect(screen.getByLabelText("No")).toBeInTheDocument();
  });

  it("updates field value on selection", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<TestForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByLabelText("Yes"));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ answer: "yes" }),
        expect.anything()
      );
    });
  });
});
