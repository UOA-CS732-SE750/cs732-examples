// Return type 'string' is optional - if left off, TypeScript will infer it from the code you've written
export function joinPaths(...segments: string[]): string {
  let result = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment?.startsWith("/")) {
      result = result.replace(/\/+$/, "") + segment;
    } else {
      result = result.replace(/\/+$/, "") + "/" + segment;
    }
  }
  return result;
}
