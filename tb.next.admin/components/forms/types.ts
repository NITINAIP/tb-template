export type BaseFieldProps = {
  name: string;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

export const resolveHelperText = (
  helperText?: string,
  error?: string,
): string | undefined => {
  if (error) {
    return error;
  }

  return helperText;
};

export const resolveErrorState = (error?: string): boolean => Boolean(error);
