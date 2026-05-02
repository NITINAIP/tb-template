/**
 * @jest-environment jsdom
 */

import {
  formatNumber,
  formatDate,
  toBuddhistYear,
  isPhoneTh,
  uuid
} from "@/utils/format";

describe("utils", () => {
  describe("formatNumber", () => {
    it("should format number using current locale (number input)", () => {
      const value = 1234567;
      const expected = Number(value).toLocaleString();
      expect(formatNumber(value)).toBe(expected);
    });

    it("should format number using current locale (string input)", () => {
      const value = "1234567";
      const expected = Number(value).toLocaleString();
      expect(formatNumber(value)).toBe(expected);
    });

    it("should return 'NaN' when input is not a numeric string", () => {
      const value = "abc";
      expect(formatNumber(value)).toBe("NaN");
    });
  });

  describe("formatDate", () => {
    it("should format a valid Date object as 'D Mon YYYY HH:mm'", () => {
      const d = new Date(2024, 0, 2, 3, 4, 0); // 2 Jan 2024 03:04
      expect(formatDate(d)).toBe("2 Jan 2024 03:04");
    });

    it("should format a valid date string", () => {
      const d = new Date(2024, 10, 15, 9, 7, 0); // 15 Nov 2024 09:07
      expect(formatDate(d.toISOString())).toBe("15 Nov 2024 09:07");
    });

    it("should return original value as string if date is invalid", () => {
      expect(formatDate("not-a-date")).toBe("not-a-date");
    });

    it("should pad hours/minutes with leading zeros", () => {
      const d = new Date(2024, 5, 1, 1, 2, 0); // 1 Jun 2024 01:02
      expect(formatDate(d)).toBe("1 Jun 2024 01:02");
    });
  });

  describe("toBuddhistYear", () => {
    it("should add 543 to gregorian year (number)", () => {
      expect(toBuddhistYear(2024)).toBe("2567");
    });

    it("should add 543 to gregorian year (string)", () => {
      expect(toBuddhistYear("2024")).toBe("2567");
    });

    it("should return 'NaN' if input cannot be converted to number", () => {
      expect(toBuddhistYear("abcd")).toBe("NaN");
    });
  });

  describe("isPhoneTh", () => {
    it("should return true for valid Thai mobile numbers without hyphens", () => {
      expect(isPhoneTh("0812345678")).toBe(true);
      expect(isPhoneTh("0912345678")).toBe(true);
      expect(isPhoneTh("0612345678")).toBe(true);
      expect(isPhoneTh("0812345678")).toBe(true);
    });

    it("should return true for valid Thai mobile numbers with hyphens", () => {
      expect(isPhoneTh("081-234-5678")).toBe(true);
      expect(isPhoneTh("091-234-5678")).toBe(true);
      expect(isPhoneTh("061-234-5678")).toBe(true);
      expect(isPhoneTh("089-999-9999")).toBe(true);
    });

    it("should return false for invalid prefixes or lengths", () => {
      expect(isPhoneTh("0712345678")).toBe(false); // prefix not 06/08/09
      expect(isPhoneTh("081234567")).toBe(false); // too short
      expect(isPhoneTh("08123456789")).toBe(false); // too long
      expect(isPhoneTh("081-23-45678")).toBe(false); // wrong grouping
      expect(isPhoneTh("08a2345678")).toBe(false); // contains non-digit
    });
  });

  describe("uuid", () => {
    it("should return uuid from window.crypto.randomUUID()", () => {
      const randomUUIDMock = jest.fn(() => "mock-uuid-123");

      Object.defineProperty(window, "crypto", {
        value: { randomUUID: randomUUIDMock },
        configurable: true
      });

      const result = uuid();

      expect(randomUUIDMock).toHaveBeenCalledTimes(1);
      expect(result).toBe("mock-uuid-123");
    });
  });
});
