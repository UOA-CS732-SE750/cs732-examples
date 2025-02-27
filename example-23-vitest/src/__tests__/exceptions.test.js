import { it, expect } from "vitest";
import { throwStuff } from "../exceptions.js";

it("throws an appropriate error", () => {
  expect(() => throwStuff()).toThrow("This is an error.");
});
