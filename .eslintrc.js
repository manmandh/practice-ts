module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "no-mixed-spaces-and-tabs": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "no-undef": "off",
  },
};
