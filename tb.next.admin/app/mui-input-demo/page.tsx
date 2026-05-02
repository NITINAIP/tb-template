"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  RHFTextInput,
  RHFTextarea,
  RHFSelect,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSwitch,
  RHFAutocomplete,
  RHFDateTime,
} from "@/components/forms";

type DemoFormData = {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  country: string;
  terms: boolean;
  role: string;
  notifications: boolean;
  favoriteColor: string;
  birthDate: string | null;
};

export default function MUIInputDemoPage() {
  const { control, handleSubmit, reset } = useForm<DemoFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      country: "",
      terms: false,
      role: "",
      notifications: false,
      favoriteColor: "",
      birthDate: null,
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<DemoFormData | null>(null);

  const onSubmit = (data: DemoFormData) => {
    setFormData(data);
    setSubmitted(true);
  };

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
  ];

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" },
    { label: "Viewer", value: "viewer" },
  ];

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
  ];

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MUI Input Components Demo
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          This page demonstrates all shared MUI input components with React Hook Form integration.
        </Typography>

        {submitted && formData && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="subtitle2">Form submitted successfully!</Typography>
            <Typography variant="caption" component="pre">
              {JSON.stringify(formData, null, 2)}
            </Typography>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Email"
              type="email"
              required
              helperText="Enter your email address"
            />

            <RHFTextarea
              control={control}
              name="bio"
              label="Bio"
              minRows={3}
              helperText="Tell us about yourself"
            />

            <RHFSelect
              control={control}
              name="country"
              label="Country"
              options={countryOptions}
              required
              helperText="Select your country"
            />

            <RHFRadioGroup
              control={control}
              name="role"
              label="Role"
              options={roleOptions}
              required
              helperText="Select your role"
            />

            <RHFAutocomplete
              control={control}
              name="favoriteColor"
              label="Favorite Color"
              options={colorOptions}
              helperText="Select or type your favorite color"
            />

            <RHFDateTime
              control={control}
              name="birthDate"
              label="Birth Date"
              helperText="Select your birth date"
            />

            <RHFCheckbox
              control={control}
              name="terms"
              label="I agree to the terms and conditions"
            />

            <RHFSwitch
              control={control}
              name="notifications"
              label="Receive email notifications"
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
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
      </Box>
    </Container>
  );
}
