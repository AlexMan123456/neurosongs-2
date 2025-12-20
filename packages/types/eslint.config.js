import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs["combined/typescript"],
  ...plugin.configs["personal/utility"],
  {
    rules: {
      "jsdoc/require-jsdoc": "off",
    },
  },
];
