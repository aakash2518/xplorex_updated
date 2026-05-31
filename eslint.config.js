import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  { ignores: ["dist", ".next"] },
  // Next.js recommended rules (includes react, react-hooks, jsx-a11y, @next/next)
  ...compat.extends("next/core-web-vitals"),
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      // Apostrophes and quotes in JSX content are fine as-is
      "react/no-unescaped-entities": "off",
      // <img> tags are used in some places with blob/data URLs not supported by next/image
      "@next/next/no-img-element": "off",
    },
  },
);
