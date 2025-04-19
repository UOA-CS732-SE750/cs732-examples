import { joinPaths } from "./path-utils";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

export function getImagePath(url) {
  return joinPaths(IMAGE_BASE_URL, url);
}
