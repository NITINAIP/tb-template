import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextInput } from "@/components/forms/rhf/RHFTextInput";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const schema = z.object({ username: z.string().min(1, "Username is required") });
type FormValues = z.infer<typeof schema>;

function TestForm({ onSubmit = jest.fn() }: { onSubmit?: () => void }) {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFTextInput control={control} name="username" label="Username" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFTextInput", () => {
  it("renders input with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("shows validation error on submit when field is empty", async () => {
    renderWithProviders(<TestForm />);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
  });

  it("does not show error when field has valid value", async () => {
    renderWithProviders(<TestForm />);
    await userEvent.type(screen.getByRole("textbox"), "alice");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
    });
  });
});
