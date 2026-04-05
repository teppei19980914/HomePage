import { describe, it, expect } from "vitest";
import { formatDate } from "./format";

describe("formatDate", () => {
  it("should format a date in Japanese locale", () => {
    const date = new Date("2026-04-03");
    const result = formatDate(date);
    expect(result).toBe("2026/04/03");
  });

  it("should handle single digit months and days", () => {
    const date = new Date("2026-01-05");
    const result = formatDate(date);
    expect(result).toBe("2026/01/05");
  });
});
