import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs["combined/typescript"],
  {
    rules: {
      // Imports in this package need to be relative so that they resolve correctly when built.
      "@alextheman/no-relative-imports": "off",
    },
  },
];
