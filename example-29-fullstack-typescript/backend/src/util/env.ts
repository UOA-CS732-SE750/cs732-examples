// !!! TypeScript !!!
// This file reads environment variables from an .env file and validates them with zod
// It exports the validated environment variables as an object to be used throughout the application

import "dotenv/config";
import { z } from "zod";

// .env schema
const envSchema = z.object({
  PORT: z.coerce.number({ message: "PORT must be a number" }).default(3000),
  DB_URL: z.string({ message: "DB_URL must be a string" }).trim(),
  VITE_IMAGE_BASE_URL: z.string().optional().default(""),
});
export type Env = z.infer<typeof envSchema>;

// Validate .env and export it
const env = parseEnv(process.env);
export default env;

// Validation function
function parseEnv(env: unknown): Env {
  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Error parsing environment variables (check your .env file):",
      );
      error.errors.forEach((err) => {
        console.error(err.message);
      });
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}
