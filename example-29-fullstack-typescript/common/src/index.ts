/**
 * This pattern is called a "barrel" file.
 *
 * It allows us to aggregate exports from multiple files into a single module.
 * Here, we only have one model, but this pattern is useful for larger projects.
 * This makes it easier to manage imports in other parts of the application.
 *
 * @see .\package.json
 */
export * from "./models/Article";

// This isn't part of the barrel, but I want to ensure that Zod is extended with Mongoose types anytime this module is accessed.
import { extendZod } from "@zodyac/zod-mongoose"; // Make Zod work as a Mongoose schema
import { z } from "zod";

extendZod(z);
