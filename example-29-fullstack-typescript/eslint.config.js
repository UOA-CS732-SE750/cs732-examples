import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignores: ["**/node_modules/**", "**/build/**", "**/dist/**"],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintConfigPrettier
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "react-x": reactX,
    "react-dom": reactDom
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
        allowNullish: true,
        allowAny: false
      }
    ],
    "@typescript-eslint/no-misused-promises": "off",
    "react-x/no-array-index-key": "off"
  }
});
