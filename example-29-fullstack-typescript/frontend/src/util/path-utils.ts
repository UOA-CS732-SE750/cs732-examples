export function joinPaths(...segments: string[]): string {
  let result = segments[0] ?? "";
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    if (segment?.startsWith("/")) {
      result = result.replace(/\/+$/, "") + segment;
    } else {
      result = result.replace(/\/+$/, "") + "/" + segment;
    }
  }
  return result;
}
