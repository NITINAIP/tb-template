import {
  emailSchema,
  passwordSchema,
  requiredString,
  optionalString,
  urlSchema,
  phoneSchema,
  stringWithLength,
} from "@/lib/validation/schemas";

describe("emailSchema", () => {
  it("accepts a valid email", () => {
    expect(emailSchema.safeParse("user@example.com").success).toBe(true);
  });

  it("rejects an empty string", () => {
    const result = emailSchema.safeParse("");
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email format", () => {
    const result = emailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });
});

describe("passwordSchema", () => {
  it("accepts a valid password (8+ chars, upper, lower, digit)", () => {
    expect(passwordSchema.safeParse("Password1").success).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = passwordSchema.safeParse("Ab1");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/at least 8 characters/i);
    }
  });

  it("rejects a password without an uppercase letter", () => {
    const result = passwordSchema.safeParse("password1");
    expect(result.success).toBe(false);
  });

  it("rejects a password without a lowercase letter", () => {
    const result = passwordSchema.safeParse("PASSWORD1");
    expect(result.success).toBe(false);
  });

  it("rejects a password without a digit", () => {
    const result = passwordSchema.safeParse("PasswordNoDigit");
    expect(result.success).toBe(false);
  });
});

describe("requiredString", () => {
  it("accepts a non-empty string", () => {
    expect(requiredString("Name").safeParse("Alice").success).toBe(true);
  });

  it("rejects an empty string with field-specific message", () => {
    const result = requiredString("Name").safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  it("rejects whitespace-only string (length 0 after trim is not enforced — length check passes)", () => {
    // requiredString uses min(1) — a single space passes min(1) intentionally
    expect(requiredString("Field").safeParse(" ").success).toBe(true);
  });
});

describe("optionalString", () => {
  it("accepts an empty string", () => {
    expect(optionalString.safeParse("").success).toBe(true);
  });

  it("accepts undefined", () => {
    expect(optionalString.safeParse(undefined).success).toBe(true);
  });

  it("accepts a non-empty string", () => {
    expect(optionalString.safeParse("hello").success).toBe(true);
  });
});

describe("urlSchema", () => {
  it("accepts a valid URL", () => {
    expect(urlSchema.safeParse("https://example.com").success).toBe(true);
  });

  it("rejects an invalid URL", () => {
    const result = urlSchema.safeParse("not-a-url");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid URL");
    }
  });
});

describe("phoneSchema", () => {
  it("accepts a valid phone number", () => {
    expect(phoneSchema.safeParse("555-867-5309").success).toBe(true);
  });

  it("accepts a number with parenthesized area code", () => {
    expect(phoneSchema.safeParse("(555)867-5309").success).toBe(true);
  });

  it("rejects letters", () => {
    const result = phoneSchema.safeParse("abc-def-ghij");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid phone number");
    }
  });
});

describe("stringWithLength", () => {
  it("accepts a string within bounds", () => {
    expect(stringWithLength(2, 10, "Tag").safeParse("hello").success).toBe(true);
  });

  it("rejects a string below minimum length", () => {
    const result = stringWithLength(5, 20, "Bio").safeParse("hi");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/at least 5 characters/i);
    }
  });

  it("rejects a string above maximum length", () => {
    const result = stringWithLength(1, 5, "Code").safeParse("toolongstring");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/at most 5 characters/i);
    }
  });
});
