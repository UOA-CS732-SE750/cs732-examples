// !!! TypeScript !!!
// This file reads environment variables from an .env file and validates them with zod
// It exports the validated environment variables as an object to be used throughout the frontend

import { z } from "zod";
import { parseEnv } from "common";

// .env schema
export const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  VITE_IMAGE_BASE_URL: z.string()
});
export type Env = z.infer<typeof envSchema>;

// Validate .env and export it
const env = parseEnv(envSchema, import.meta.env);
export default env;
