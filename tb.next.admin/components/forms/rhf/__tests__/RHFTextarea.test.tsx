import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextarea } from "@/components/forms/rhf/RHFTextarea";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

const schema = z.object({ bio: z.string().min(1, "Bio is required") });
type FormValues = z.infer<typeof schema>;

function TestForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { bio: "" },
  });
  return (
    <form onSubmit={handleSubmit(jest.fn())}>
      <RHFTextarea control={control} name="bio" label="Bio" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("RHFTextarea", () => {
  it("renders textarea with label", () => {
    renderWithProviders(<TestForm />);
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  it("shows validation error on submit when empty", async () => {
    renderWithProviders(<TestForm />);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText("Bio is required")).toBeInTheDocument();
    });
  });
});
