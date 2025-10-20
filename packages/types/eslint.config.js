import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs["combined/typescript"],
  {
    rules: {
      // This package literally exists to export types. Would be kinda silly not to give strict type annotations to parser functions
      // who are meant to enforce strict types now, wouldn't it be?
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
];
