import { joinPaths } from "./path-utils";

// !!! TypeScript !!!
// Return type 'string' is optional - if left off, TypeScript will infer it from the code you've written
export function getImagePath(url: string): string {
  return joinPaths(env.VITE_IMAGE_BASE_URL, url);
}
