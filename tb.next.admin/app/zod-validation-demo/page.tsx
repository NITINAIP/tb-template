
"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { RHFTextInput, RHFTextarea } from "@/components/forms";
import { emailSchema, passwordSchema, requiredString } from "@/lib/validation";

/**
 * Define form schema using Zod
 * This schema provides both validation rules and type safety
 */
const registrationSchema = z
  .object({
    firstName: requiredString("First name"),
    lastName: requiredString("Last name"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    bio: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Infer TypeScript type from the schema
 * This provides full type safety for form data
 */
type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function ZodValidationDemoPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    },
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState<RegistrationFormData | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    // Simulate async submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFormData(data);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Zod + RHF Validation Demo
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          This form demonstrates Zod schema validation with React Hook Form. Try submitting with invalid data to see
          schema-based error messages.
        </Typography>

        {submitted && formData && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="subtitle2">Registration successful!</Typography>
            <Typography variant="caption" component="pre">
              {JSON.stringify(formData, null, 2)}
            </Typography>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <RHFTextInput
              control={control}
              name="firstName"
              label="First Name"
              required
              helperText="Enter your first name"
            />

            <RHFTextInput
              control={control}
              name="lastName"
              label="Last Name"
              required
              helperText="Enter your last name"
            />

            <RHFTextInput
              control={control}
              name="email"
              label="Email Address"
              type="email"
              required
              helperText="We'll use this to contact you"
            />

            <RHFTextInput
              control={control}
              name="password"
              label="Password"
              type="password"
              required
              helperText="At least 8 chars, with uppercase, lowercase, and number"
            />

            <RHFTextInput
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              helperText="Re-enter your password"
            />

            <RHFTextarea
              control={control}
              name="bio"
              label="Bio (Optional)"
              minRows={3}
              helperText="Tell us about yourself"
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  reset();
                  setSubmitted(false);
                  setFormData(null);
                }}
              >
                Reset
              </Button>
            </Box>
          </Stack>
        </form>

        <Box sx={{ mt: 4, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Schema Definition:
          </Typography>
          <Typography variant="caption" component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {`const registrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[0-9]/, "Must contain number"),
    confirmPassword: z.string().min(1),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })`}
            </Typography>
        </Box>
      </Box>
    </Container>
  );
}
