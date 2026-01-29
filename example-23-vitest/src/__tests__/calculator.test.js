import { it, describe, expect } from "vitest";
import { sum, difference } from "../calculator.js";

describe("Addition", () => {
  it("adds 1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 3 + 5 + 4 = 12", () => {
    expect(sum(3, 5, 4)).toBe(12);
  });

  it("adds nothing = 0", () => {
    expect(sum()).toBe(0);
  });

  it("adds one thing = that thing", () => {
    expect(sum(42)).toBe(42);
  });

  it("throws an error on receiving non-numeric values when adding", () => {
    expect(() => sum(2, null, 5)).toThrow("Non-numeric value detected");
    expect(() => sum(undefined, 2)).toThrow("Non-numeric value detected");
    expect(() => sum([], 2)).toThrow("Non-numeric value detected");
    expect(() => sum("Hello", 2)).toThrow("Non-numeric value detected");
  });
});

describe("Subtraction", () => {
  it("subtracts 6 - 4 = 2", () => {
    expect(difference(6, 4)).toBe(2);
  });

  it("subtracts 10 - 8 - 1 = 1", () => {
    expect(difference(10, 8, 1)).toBe(1);
  });

  it("subtracts nothing = 0", () => {
    expect(difference()).toBe(0);
  });

  it("subtracts one thing = that thing", () => {
    expect(difference(42)).toBe(42);
  });

  it("throws an error when non-numeric value detected", () => {
    expect(() => difference(2, null, 5)).toThrow("Non-numeric value detected");
    expect(() => difference(undefined, 2)).toThrow("Non-numeric value detected");
    expect(() => difference([], 2)).toThrow("Non-numeric value detected");
    expect(() => difference("Hello", 2)).toThrow("Non-numeric value detected");
  });
});
