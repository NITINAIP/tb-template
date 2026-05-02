import { z } from "zod";

/**
 * Common email validation schema
 */
export const emailSchema = z.string().email("Invalid email address").min(1, "Email is required");

/**
 * Common password validation schema
 * Requires at least 8 characters
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * Required string field
 */
export const requiredString = (fieldName: string = "Field") =>
  z.string().min(1, `${fieldName} is required`);

/**
 * Optional string field
 */
export const optionalString = z.string().optional().or(z.literal(""));

/**
 * URL validation schema
 */
export const urlSchema = z.string().url("Invalid URL");

/**
 * Phone number validation schema (basic)
 */
export const phoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number");

/**
 * Helper to create a min/max string schema
 */
export const stringWithLength = (min: number, max: number, fieldName: string = "Field") =>
  z
    .string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);
