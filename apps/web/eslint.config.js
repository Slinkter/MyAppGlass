import globals from "globals";
import tseslint from "typescript-eslint";
import { readdirSync } from "node:fs";
import baseConfig from "@gya/eslint-config";

/**
 * Fronteras de capas FSD: `app > screens > widgets > features > shared`.
 * Una capa solo puede importar hacia abajo. Se aplica con la regla nativa
 * `no-restricted-imports` para no añadir dependencias.
 *
 * Nota: solo cubre los alias (`@/features/**`). Los imports relativos que
 * escapan de la capa (`../../features/...`) no se detectan; la convención
 * del repo es usar siempre el alias.
 */
const restrictUpwards = (blockedLayers) => [
  "error",
  {
    patterns: [
      {
        group: blockedLayers.flatMap((layer) => [
          `@/${layer}`,
          `@/${layer}/**`,
          `@${layer}`,
          `@${layer}/**`,
        ]),
        message:
          "Violación FSD: esta capa no puede importar de una capa superior. Baja la dependencia a `shared` (o a `entities` cuando exista).",
      },
    ],
  },
];

const FSD_LAYERS = {
  shared: ["entities", "features", "widgets", "screens", "app"],
  entities: ["features", "widgets", "screens", "app"],
  widgets: ["screens", "app"],
  // Las pantallas se componen entre sí solo a través de `app`; una pantalla
  // no debe importar otra pantalla.
  screens: ["screens", "app"],
};

/**
 * Una feature no puede importar otra feature. Se enumeran las carpetas para
 * bloquear solo las ajenas: los imports internos de la propia feature siguen
 * permitidos (`@/features/<misma>`).
 */
const FEATURES = readdirSync(new URL("./src/features", import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

export default tseslint.config(
  ...baseConfig,
  {
    files: ["src/app/**/*.{ts,tsx}", "src/**/context/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["src/entities/project/ui/modal/VisualViewer.jsx", "src/entities/project/ui/modal/VisualViewer.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrictUpwards(["app"]),
    },
  },
  ...Object.entries(FSD_LAYERS).map(([layer, blocked]) => ({
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": restrictUpwards(blocked),
    },
  })),
  ...FEATURES.map((feature) => ({
    files: [`src/features/${feature}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                ...FEATURES.filter((other) => other !== feature).flatMap((other) => [
                  `@/features/${other}`,
                  `@/features/${other}/**`,
                  `@features/${other}`,
                  `@features/${other}/**`,
                ]),
                ...["widgets", "screens", "app"].flatMap((layer) => [
                  `@/${layer}`,
                  `@/${layer}/**`,
                  `@${layer}`,
                  `@${layer}/**`,
                ]),
              ],
              message:
                "Violación FSD: una feature no puede importar otra feature ni una capa superior. Baja la dependencia a `entities` o `shared`.",
            },
          ],
        },
      ],
    },
  })),
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
