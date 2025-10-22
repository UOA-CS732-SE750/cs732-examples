// !!! TypeScript !!!
// This file reads environment variables from an .env file and validates them with zod
// It exports the validated environment variables as an object to be used throughout the backend

import "dotenv/config";
import { z } from "zod";
import { parseEnv } from "common";

// .env schema
export const envSchema = z.object({
  PORT: z.coerce.number({ message: "PORT must be a number" }).default(3000),
  DB_URL: z.string({ message: "DB_URL must be a string" }).trim()
});
export type Env = z.infer<typeof envSchema>;

// Validate .env and export it
const env = parseEnv(envSchema, process.env);
export default env;
