import globals from "globals";
import tseslint from "typescript-eslint";
import baseConfig from "@gya/eslint-config";

export default tseslint.config(
  ...baseConfig,
  {
    files: ["src/app/**/*.{ts,tsx}", "src/**/context/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["src/features/projects/components/modal/VisualViewer.jsx", "src/features/projects/components/modal/VisualViewer.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["functions/**/*.js", "functions/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^(req|res|next|Resend)$" }],
    },
  },
  {
    files: ["**/*.cjs", "vite.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  }
);
