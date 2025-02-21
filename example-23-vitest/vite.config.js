import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./vitest.setup.js"
  }
});