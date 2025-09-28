module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: ["eslint:recommended"],
    rules: {
        quotes: ["error", "double"],
        "max-len": "off", // 🔥 desactiva límite de caracteres
        indent: "off", // 🔥 desactiva indentación estricta
        "object-curly-spacing": "off", // 🔥 desactiva espacios en objetos
        "quote-props": "off", // 🔥 desactiva error de comillas en claves
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
};
