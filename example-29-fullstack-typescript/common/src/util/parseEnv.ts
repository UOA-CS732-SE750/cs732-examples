import { z, ZodSchema } from "zod";

// !!! TypeScript !!!
// The <T> syntax is a TypeScript generic type. TypeScript will infer the type of T based on the schema you pass in.
export function parseEnv<T>(schema: ZodSchema<T>, env: unknown): T {

  // Validation function
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Error parsing environment variables (check your .env file):"
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
