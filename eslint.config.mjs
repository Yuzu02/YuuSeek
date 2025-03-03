import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Additional, per-project rules...
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
    ignores: [
      "node_modules",
      ".next",
      ".cache",
      "package-lock.json",
      "public",
      "next-env.d.ts",
      "next.config.ts",
      "ui",
      "src/data/bang.ts",
    ],
  },
];

export default eslintConfig;
