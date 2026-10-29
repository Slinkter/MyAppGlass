module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2020,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["warn", { "code": 140, "ignoreStrings": true, "ignoreTemplateLiterals": true, "ignoreUrls": true, "ignoreComments": true }],
    "valid-jsdoc": "off",
    "require-jsdoc": "off",
    // Estilo de indentación/comas del código existente (mezcla 2 y 4 espacios).
    // Se desactivan para no reformatear el código de producción.
    "indent": "off",
    "comma-dangle": "off",
    "operator-linebreak": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
