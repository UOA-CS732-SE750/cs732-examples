import z from "zod";

// Zod is a library for runtime validation of objects
// It works great with TS, but you don't have to use it if you don't want to
// Docs: https://zod.dev/
export const ArticleSchema = z.object({
  _id: z.string(),
  title: z.string().nonempty().max(100), // You can specifify extra constraints like min/max length (not available in TS)
  date: z.coerce.date(), // Use coerce to auto-convert data while validating
  image: z.string().url(),
  content: z.string()
});

export type ArticleType = z.infer<typeof ArticleSchema>; // You can auto-generate TS types from zod schemas

// You can define Typescript types like this instead if you're not using zod for validation
// export type Article = {
//   id: string;
//   title: string;
//   date: Date;
//   image: string;
//   content: string;
// }
