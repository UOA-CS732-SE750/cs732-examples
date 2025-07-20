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
